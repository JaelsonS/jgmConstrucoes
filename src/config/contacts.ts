/**
 * Contactos oficiais da JGM usados no frontend.
 * Números e URLs públicos (não são segredos).
 */
export const CONTACTS = {
  /** Número WhatsApp em formato internacional, só dígitos (sem + nem espaços). */
  whatsappE164Digits: "351911040509",
  /** Apresentação legível do número. */
  whatsappDisplay: "+351 911 040 509",
  social: {
    instagram: "https://www.instagram.com/jgm_remodelacoes_e_pinturas/",
    facebook: "https://www.facebook.com/profile.php?id=61560446386054",
  },
} as const;

export function hasWhatsAppConfigured() {
  return CONTACTS.whatsappE164Digits.length >= 8;
}
