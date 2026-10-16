import { z } from "zod";

export const careerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  area: z.string().trim().min(1).max(120),
  message: z.string().trim().max(1500).optional().default(""),
  language: z.enum(["pt", "en", "es"]),
  website: z.string().max(0).optional().default(""),
  submissionId: z.string().uuid(),
});
