import { createServerFn } from "@tanstack/react-start";
import { careerSchema } from "./career-schema";

const accepted = new Map<string, number>();
const attempts = new Map<string, { count: number; expiresAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character,
  );
}

async function emailKey(email: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.toLowerCase()));
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const sendCareerInterest = createServerFn({ method: "POST" })
  .validator(careerSchema)
  .handler(async ({ data }) => {
    if (data.website) throw new Error("INVALID_SUBMISSION");
    const now = Date.now();
    for (const [key, expiresAt] of accepted) if (expiresAt <= now) accepted.delete(key);
    for (const [key, value] of attempts) if (value.expiresAt <= now) attempts.delete(key);
    if (accepted.has(data.submissionId)) return { accepted: true as const, duplicate: true as const };
    const key = await emailKey(data.email);
    const attempt = attempts.get(key);
    if (attempt && attempt.count >= 3) throw new Error("RATE_LIMITED");
    attempts.set(key, { count: (attempt?.count ?? 0) + 1, expiresAt: attempt?.expiresAt ?? now + WINDOW_MS });

    const apiKey = process.env["EMAIL_API_KEY"];
    const from = process.env["EMAIL_FROM"];
    const recipient = process.env["RECRUITMENT_RECIPIENT"];
    if (process.env["EMAIL_PROVIDER"] !== "resend" || !apiKey || !from || !recipient) {
      throw new Error("EMAIL_NOT_CONFIGURED");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: data.email,
        subject: `Manifestação de interesse profissional — ${data.area}`,
        text: [
          `Nome: ${data.name}`,
          `Email: ${data.email}`,
          `Telefone: ${data.phone || "Não indicado"}`,
          `Área: ${data.area}`,
          `Idioma: ${data.language}`,
          "",
          data.message || "Sem mensagem adicional.",
          "",
          "Nenhum currículo foi recolhido pelo website.",
        ].join("\n"),
        html: `<h1>Manifestação de interesse profissional</h1>
          <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Telefone:</strong> ${escapeHtml(data.phone || "Não indicado")}</p>
          <p><strong>Área:</strong> ${escapeHtml(data.area)}</p>
          <p>${escapeHtml(data.message || "Sem mensagem adicional.").replace(/\n/g, "<br>")}</p>
          <p><em>Nenhum currículo foi recolhido pelo website.</em></p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("EMAIL_PROVIDER_REJECTED");
    accepted.set(data.submissionId, now + 24 * 60 * 60 * 1000);
    return { accepted: true as const, duplicate: false as const };
  });
