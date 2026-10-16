import { z } from "zod";
import { isOptionalPhoneValid } from "@/lib/phone";

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

/** Telefone opcional em E.164 quando preenchido (ex.: +351912345678). */
const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .optional()
  .default("")
  .refine((value) => isOptionalPhoneValid(value), { message: "Invalid phone number" });

export const contactSchema = z.object({
  name: cleanText(120),
  email: z.string().trim().email().max(254),
  phone: optionalPhone,
  service: z.enum(CONTACT_SERVICES),
  location: z.string().trim().max(160).optional().default(""),
  message: cleanText(3000),
  language: z.enum(["pt", "en", "es"]),
  website: z.string().max(0).optional().default(""),
  submissionId: z.string().uuid(),
});

export type ContactInput = z.infer<typeof contactSchema>;
