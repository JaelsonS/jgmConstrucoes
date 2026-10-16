import { CONTACTS } from "@/config/contacts";

export const SITE_CONFIG = {
  canonicalOrigin:
    import.meta.env["VITE_SITE_URL"] || "https://jgmconstrucoes.com",
  afDigitalUrl: "https://afdigitalweb.com/",
  complaintsUrl: "https://www.livroreclamacoes.pt/",
  googleReviewUrl: "",
  socialUrls: {
    facebook: CONTACTS.social.facebook,
    instagram: CONTACTS.social.instagram,
    linkedin: "",
  },
  launchYear: 2026,
} as const;

export function copyrightYears(currentYear = new Date().getFullYear()) {
  return currentYear <= SITE_CONFIG.launchYear
    ? String(SITE_CONFIG.launchYear)
    : `${SITE_CONFIG.launchYear}–${currentYear}`;
}
