import { z } from "zod";

export const CONTACT_SERVICES = [
  "buildings",
  "lsf",
  "renovations",
  "painting",
  "coverings",
  "plastering",
  "glazing",
  "roofing",
  "etics",
  "other",
] as const;

const hasNoControlCharacters = (value: string) =>
  Array.from(value).every((character) => {
    const code = character.charCodeAt(0);
    return code === 9 || code === 10 || code === 13 || code >= 32;
  });

const cleanText = (max: number) =>
  z.string().trim().min(1).max(max).refine(hasNoControlCharacters);

export const contactSchema = z.object({
  name: cleanText(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.enum(CONTACT_SERVICES),
  location: z.string().trim().max(160).optional().default(""),
  message: cleanText(3000),
  language: z.enum(["pt", "en", "es"]),
  website: z.string().max(0).optional().default(""),
  submissionId: z.string().uuid(),
});

export type ContactInput = z.infer<typeof contactSchema>;
