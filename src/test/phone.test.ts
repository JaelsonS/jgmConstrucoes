import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { careerSchema } from "@/lib/career-schema";
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  isOptionalPhoneValid,
  splitPhoneValue,
  toE164,
} from "@/lib/phone";
import { validatePhoneField } from "@/components/phone-input";
import { DICT } from "@/i18n/content";

const baseContact = {
  name: "Ana Silva",
  email: "ana@example.com",
  service: "painting" as const,
  location: "Coimbra",
  message: "Preciso de pintura interior.",
  language: "pt" as const,
  website: "",
  submissionId: "11111111-1111-4111-8111-111111111111",
};

describe("phone helpers", () => {
  it("defaults the country list to Portugal with +351", () => {
    expect(DEFAULT_PHONE_COUNTRY).toBe("PT");
    expect(PHONE_COUNTRIES[0]?.iso).toBe("PT");
    expect(PHONE_COUNTRIES[0]?.dial).toBe("+351");
  });

  it("normalizes national Portuguese numbers to E.164", () => {
    expect(toE164("912 345 678", "PT")).toBe("+351912345678");
    expect(toE164("912345678", "PT")).toBe("+351912345678");
  });

  it("does not invent a valid number from arbitrary digits", () => {
    expect(isOptionalPhoneValid("123", "PT")).toBe(false);
    expect(isOptionalPhoneValid("999999999999999", "PT")).toBe(false);
    expect(isOptionalPhoneValid("abcdef", "PT")).toBe(false);
  });

  it("accepts empty optional phones and valid E.164", () => {
    expect(isOptionalPhoneValid("")).toBe(true);
    expect(isOptionalPhoneValid("   ")).toBe(true);
    expect(isOptionalPhoneValid("+351912345678")).toBe(true);
    expect(isOptionalPhoneValid("912345678", "PT")).toBe(true);
  });

  it("splits E.164 values without silently rewriting national input when empty", () => {
    expect(splitPhoneValue("")).toEqual({ country: "PT", national: "" });
    expect(splitPhoneValue("+351912345678")).toEqual({
      country: "PT",
      national: "912345678",
    });
  });

  it("localizes phone UI copy in PT, EN and ES", () => {
    for (const lang of ["pt", "en", "es"] as const) {
      const f = DICT[lang].contact.form;
      expect(f.phoneCountry.length).toBeGreaterThan(2);
      expect(f.phoneSearch.length).toBeGreaterThan(2);
      expect(f.phoneInvalid.length).toBeGreaterThan(5);
      expect(f.phoneNoResults.length).toBeGreaterThan(2);
    }
  });

  it("exposes validatePhoneField for client forms", () => {
    expect(validatePhoneField("", "bad")).toBeUndefined();
    expect(validatePhoneField("+351912345678", "bad")).toBeUndefined();
    expect(validatePhoneField("12345", "bad")).toBe("bad");
  });
});

describe("contact and career schemas — phone", () => {
  it("accepts empty phone and valid E.164 on contact", () => {
    expect(contactSchema.parse({ ...baseContact, phone: "" }).phone).toBe("");
    expect(contactSchema.parse({ ...baseContact, phone: "+351912345678" }).phone).toBe(
      "+351912345678",
    );
  });

  it("rejects clearly invalid contact phones", () => {
    expect(() => contactSchema.parse({ ...baseContact, phone: "12345" })).toThrow();
    expect(() => contactSchema.parse({ ...baseContact, phone: "999999999999" })).toThrow();
  });

  it("applies the same rules to career submissions", () => {
    const base = {
      name: "João",
      email: "joao@example.com",
      area: "Pintura",
      message: "",
      language: "pt" as const,
      website: "",
      submissionId: "22222222-2222-4222-8222-222222222222",
    };
    expect(careerSchema.parse({ ...base, phone: "" }).phone).toBe("");
    expect(careerSchema.parse({ ...base, phone: "+351911234567" }).phone).toBe("+351911234567");
    expect(() => careerSchema.parse({ ...base, phone: "abc" })).toThrow();
  });
});
