import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  LANGS,
  PAGE_SLUGS,
  SERVICE_IDS,
  SERVICE_SLUGS,
  homePaths,
  pagePaths,
  pageKeyFromSlug,
  seoHead,
  servicePaths,
  serviceFromSlug,
} from "@/i18n/content";
import { EXTRA_CONTENT } from "@/i18n/extended-content";
import { copyrightYears } from "@/config/site";
import { contactSchema } from "@/lib/contact-schema";
import { careerSchema } from "@/lib/career-schema";

describe("localized routes", () => {
  it("round-trips every page and service slug", () => {
    for (const lang of LANGS) {
      for (const [page, slug] of Object.entries(PAGE_SLUGS[lang])) {
        expect(pageKeyFromSlug(lang, slug)).toBe(page);
      }
      for (const service of SERVICE_IDS) {
        expect(serviceFromSlug(lang, SERVICE_SLUGS[lang][service])).toBe(service);
      }
    }
  });

  it("emits canonical, hreflang and social metadata", () => {
    const head = seoHead("pt", "Title", "Description", {
      pt: "/pt/teste",
      en: "/en/test",
      es: "/es/prueba",
    });
    expect(head.links).toContainEqual(expect.objectContaining({ rel: "canonical", href: "https://jgmconstrucoes.com/pt/teste" }));
    expect(head.links.filter((link) => link.rel === "alternate")).toHaveLength(4);
    expect(head.meta).toContainEqual(expect.objectContaining({ property: "og:image" }));
  });

  it("lists every localized public route in the sitemap", () => {
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    const paths = [
      ...Object.values(homePaths()),
      ...Object.keys(PAGE_SLUGS.pt).flatMap((page) => Object.values(pagePaths(page as keyof typeof PAGE_SLUGS.pt))),
      ...SERVICE_IDS.flatMap((service) => Object.values(servicePaths(service))),
      ...LANGS.flatMap((lang) => EXTRA_CONTENT[lang].blog.articles.map((article) => `/${lang}/${PAGE_SLUGS[lang].blog}/${article.slug}`)),
    ];
    for (const path of paths) expect(sitemap).toContain(`https://jgmconstrucoes.com${path}`);
  });
});

describe("contact validation", () => {
  const valid = {
    name: "Pessoa de teste",
    email: "teste@example.com",
    phone: "",
    service: "lsf",
    location: "Coimbra",
    message: "Pedido fictício usado apenas num teste automatizado.",
    language: "pt",
    website: "",
    submissionId: "123e4567-e89b-12d3-a456-426614174000",
  };

  it("accepts a minimal valid request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects honeypot content and oversized fields", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
  });

  it("validates career interest without accepting a file", () => {
    const parsed = careerSchema.safeParse({
      name: "Pessoa de teste",
      email: "candidate@example.com",
      area: "Pintura",
      language: "pt",
      website: "",
      submissionId: "123e4567-e89b-12d3-a456-426614174000",
    });
    expect(parsed.success).toBe(true);
    expect(careerSchema.keyof().options).not.toContain("file");
  });
});

describe("automatic copyright year", () => {
  it("uses a single launch year and then a range", () => {
    expect(copyrightYears(2026)).toBe("2026");
    expect(copyrightYears(2027)).toBe("2026–2027");
  });
});
