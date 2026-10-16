import { createServerFn } from "@tanstack/react-start";
import { contactSchema, type ContactInput } from "./contact-schema";

type Attempt = { count: number; expiresAt: number };
const attempts = new Map<string, Attempt>();
const acceptedSubmissions = new Map<string, number>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character,
  );
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value.toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function cleanExpired(now: number) {
  for (const [key, value] of attempts) if (value.expiresAt <= now) attempts.delete(key);
  for (const [key, expiresAt] of acceptedSubmissions) if (expiresAt <= now) acceptedSubmissions.delete(key);
}

async function enforceAbuseControls(input: ContactInput) {
  const now = Date.now();
  cleanExpired(now);
  if (input.website) throw new Error("INVALID_SUBMISSION");
  if (acceptedSubmissions.has(input.submissionId)) return "duplicate" as const;

  const key = await digest(input.email);
  const current = attempts.get(key);
  if (current && current.count >= MAX_ATTEMPTS) throw new Error("RATE_LIMITED");
  attempts.set(key, {
    count: (current?.count ?? 0) + 1,
    expiresAt: current?.expiresAt ?? now + WINDOW_MS,
  });
  return "new" as const;
}

async function sendWithResend(input: ContactInput) {
  const apiKey = process.env["EMAIL_API_KEY"];
  const from = process.env["EMAIL_FROM"];
  const recipient = process.env["CONTACT_RECIPIENT"];
  if (!apiKey || !from || !recipient) throw new Error("EMAIL_NOT_CONFIGURED");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: input.email,
      subject: `Novo pedido de orçamento — ${input.service}`,
      text: [
        `Nome: ${input.name}`,
        `Email: ${input.email}`,
        `Telefone: ${input.phone || "Não indicado"}`,
        `Serviço: ${input.service}`,
        `Localização: ${input.location || "Não indicada"}`,
        `Idioma: ${input.language}`,
        "",
        input.message,
      ].join("\n"),
      html: `<h1>Novo pedido de orçamento</h1>
        <p><strong>Nome:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Telefone:</strong> ${escapeHtml(input.phone || "Não indicado")}</p>
        <p><strong>Serviço:</strong> ${escapeHtml(input.service)}</p>
        <p><strong>Localização:</strong> ${escapeHtml(input.location || "Não indicada")}</p>
        <p><strong>Idioma:</strong> ${escapeHtml(input.language)}</p>
        <hr><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("EMAIL_PROVIDER_REJECTED");
}

export const sendContactRequest = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const state = await enforceAbuseControls(data);
    if (state === "duplicate") return { accepted: true as const, duplicate: true as const };

    const provider = process.env["EMAIL_PROVIDER"];
    if (provider !== "resend") throw new Error("EMAIL_NOT_CONFIGURED");
    await sendWithResend(data);
    acceptedSubmissions.set(data.submissionId, Date.now() + 24 * 60 * 60 * 1000);
    return { accepted: true as const, duplicate: false as const };
  });
