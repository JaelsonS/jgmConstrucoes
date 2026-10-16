import {
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

/** Países oferecidos no seletor (PT predefinido). Lista curada, não inventa cobertura mundial. */
export const PHONE_COUNTRY_CODES = [
  "PT",
  "ES",
  "FR",
  "DE",
  "GB",
  "IE",
  "IT",
  "BE",
  "NL",
  "LU",
  "CH",
  "AT",
  "BR",
  "AO",
  "MZ",
  "CV",
  "US",
  "CA",
  "PL",
  "RO",
  "SE",
  "NO",
  "DK",
  "FI",
] as const satisfies readonly CountryCode[];

export type PhoneCountryCode = (typeof PHONE_COUNTRY_CODES)[number];

export const DEFAULT_PHONE_COUNTRY: PhoneCountryCode = "PT";

export type PhoneCountryOption = {
  iso: PhoneCountryCode;
  dial: string;
  flag: string;
};

function flagEmoji(iso: string) {
  return [...iso.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export const PHONE_COUNTRIES: PhoneCountryOption[] = PHONE_COUNTRY_CODES.map((iso) => ({
  iso,
  dial: `+${getCountryCallingCode(iso)}`,
  flag: flagEmoji(iso),
}));

export function countryDisplayName(iso: PhoneCountryCode, lang: "pt" | "en" | "es") {
  const locale = lang === "pt" ? "pt-PT" : lang === "es" ? "es-ES" : "en-GB";
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(iso) ?? iso;
  } catch {
    return iso;
  }
}

/** Normaliza para E.164. Vazio se não houver dígitos nacionais. */
export function toE164(nationalNumber: string, country: PhoneCountryCode): string {
  const digits = nationalNumber.replace(/\D/g, "");
  if (!digits) return "";
  const parsed = parsePhoneNumberFromString(nationalNumber, country);
  if (parsed?.number) return parsed.number;
  const dial = getCountryCallingCode(country);
  return `+${dial}${digits}`;
}

/**
 * Valida telefone opcional.
 * Vazio = válido. Preenchido = tem de ser um número válido para o país (libphonenumber).
 */
export function isOptionalPhoneValid(value: string, country?: PhoneCountryCode): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (country) return isValidPhoneNumber(trimmed, country) || isValidPhoneNumber(trimmed);
  return isValidPhoneNumber(trimmed);
}

/** Extrai país e número nacional a partir de um valor E.164 ou nacional. */
export function splitPhoneValue(
  value: string,
  fallback: PhoneCountryCode = DEFAULT_PHONE_COUNTRY,
): { country: PhoneCountryCode; national: string } {
  const trimmed = value.trim();
  if (!trimmed) return { country: fallback, national: "" };
  const parsed = parsePhoneNumberFromString(trimmed, fallback);
  if (parsed?.country && PHONE_COUNTRY_CODES.includes(parsed.country as PhoneCountryCode)) {
    return {
      country: parsed.country as PhoneCountryCode,
      national: parsed.nationalNumber,
    };
  }
  return { country: fallback, national: trimmed.replace(/^\+\d+\s*/, "") };
}
