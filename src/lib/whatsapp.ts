import { CONTACTS, hasWhatsAppConfigured } from "@/config/contacts";

/** Constrói um link Click to Chat oficial (`wa.me`) com texto opcional. */
export function buildWhatsAppUrl(text?: string): string | null {
  if (!hasWhatsAppConfigured()) return null;
  const base = `https://wa.me/${CONTACTS.whatsappE164Digits}`;
  const trimmed = text?.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

export function openWhatsApp(text?: string) {
  const url = buildWhatsAppUrl(text);
  if (!url || typeof window === "undefined") return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
