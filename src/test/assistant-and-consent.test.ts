import { describe, expect, it } from "vitest";
import { ASSISTANT_CONTENT } from "@/i18n/assistant-content";
import { EXTRA_CONTENT } from "@/i18n/extended-content";
import { LANGS } from "@/i18n/content";
import { CONTACTS, hasWhatsAppConfigured } from "@/config/contacts";
import { SITE_CONFIG } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  changeLanguage,
  goBack,
  goToPreview,
  needFromClarify,
  restartKeepingLanguage,
  selectClarify,
  selectLanguage,
  selectNeed,
  selectPhase,
  selectProperty,
  selectTimeline,
  submitDescription,
  submitLocation,
  submitOtherService,
  submitScope,
} from "@/lib/assistant/machine";
import { INITIAL_STATE } from "@/lib/assistant/types";
import {
  buildDirectWhatsAppMessage,
  buildQuoteWhatsAppMessage,
  buildSummaryRows,
} from "@/lib/assistant/message";

describe("contacts and WhatsApp", () => {
  it("uses the official WhatsApp number without spaces or plus", () => {
    expect(hasWhatsAppConfigured()).toBe(true);
    expect(CONTACTS.whatsappE164Digits).toBe("351911040509");
    expect(CONTACTS.whatsappDisplay).toContain("911 040 509");
  });

  it("builds Click to Chat URLs with encoded text", () => {
    const text = "Olá, equipa da JGM!";
    const url = buildWhatsAppUrl(text);
    expect(url).toBe(`https://wa.me/351911040509?text=${encodeURIComponent(text)}`);
    expect(url).toContain("%C3%A1");
    expect(decodeURIComponent(url!.split("text=")[1]!)).toBe(text);
  });

  it("exposes official social profiles", () => {
    expect(SITE_CONFIG.socialUrls.instagram).toBe(
      "https://www.instagram.com/jgm_remodelacoes_e_pinturas/",
    );
    expect(SITE_CONFIG.socialUrls.facebook).toBe(
      "https://www.facebook.com/profile.php?id=61560446386054",
    );
  });
});

describe("cookie preference copy", () => {
  it("uses cookie terminology in all languages", () => {
    for (const lang of LANGS) {
      const c = EXTRA_CONTENT[lang].consent;
      expect(c.title.toLowerCase()).toMatch(/cookie/);
      expect(c.reopen.toLowerCase()).toMatch(/cookie/);
      expect(c.close.length).toBeGreaterThan(3);
      expect(c.necessary.toLowerCase()).toMatch(/cookie|necess/);
    }
  });
});

describe("sales assistant state machine", () => {
  it("requires language before need", () => {
    const afterLang = selectLanguage(INITIAL_STATE, "en");
    expect(afterLang.step).toBe("need");
    expect(afterLang.answers.chatLang).toBe("en");
  });

  it("routes other and unsure correctly", () => {
    let s = selectLanguage(INITIAL_STATE, "pt");
    s = selectNeed(s, "other");
    expect(s.step).toBe("otherService");
    s = submitOtherService(s, "Reparação pontual");
    expect(s.step).toBe("property");
    expect(s.answers.otherService).toBe("Reparação pontual");

    let u = selectLanguage(INITIAL_STATE, "pt");
    u = selectNeed(u, "unsure");
    expect(u.step).toBe("clarify");
    u = selectClarify(u, "renovate");
    expect(u.answers.need).toBe("renovations");
    expect(needFromClarify("exterior")).toBe("etics");
  });

  it("advances through a full quote flow and builds a message without empty fields", () => {
    let s = selectLanguage(INITIAL_STATE, "pt");
    s = selectNeed(s, "painting");
    s = selectProperty(s, "home");
    s = submitLocation(s, "Coimbra");
    s = submitDescription(s, "Pintar sala e corredor");
    s = submitScope(s, "");
    s = selectPhase(s, "evaluation");
    s = selectTimeline(s, "months");
    expect(s.step).toBe("summary");

    const t = ASSISTANT_CONTENT.pt;
    const rows = buildSummaryRows(s.answers, t);
    expect(rows.map((r) => r.label)).not.toContain(t.summary.scope);
    expect(rows.some((r) => r.value === "Coimbra")).toBe(true);

    const message = buildQuoteWhatsAppMessage(s.answers, t);
    expect(message).toContain("Pintura");
    expect(message).toContain("Coimbra");
    expect(message).not.toContain("[");
    expect(message).not.toContain("Dimensão aproximada");

    s = goToPreview(s);
    expect(s.step).toBe("preview");

    const back = goBack(s);
    expect(back.step).toBe("summary");
  });

  it("keeps direct WhatsApp message short and localized", () => {
    for (const lang of LANGS) {
      const msg = buildDirectWhatsAppMessage(ASSISTANT_CONTENT[lang]);
      expect(msg.length).toBeGreaterThan(20);
      expect(msg.toLowerCase()).toMatch(/jgm/);
    }
  });

  it("supports restart and language change", () => {
    let s = selectLanguage(INITIAL_STATE, "es");
    s = selectNeed(s, "lsf");
    const kept = restartKeepingLanguage(s);
    expect(kept.answers.chatLang).toBe("es");
    expect(kept.step).toBe("need");
    expect(kept.answers.need).toBeNull();

    const changed = changeLanguage();
    expect(changed.step).toBe("language");
    expect(changed.answers.chatLang).toBeNull();
  });
});

describe("assistant i18n coverage", () => {
  it("has the same option ids in every language", () => {
    const base = ASSISTANT_CONTENT.pt;
    for (const lang of LANGS) {
      const c = ASSISTANT_CONTENT[lang];
      expect(c.options.clarify.map((o) => o.id)).toEqual(base.options.clarify.map((o) => o.id));
      expect(c.options.property.map((o) => o.id)).toEqual(base.options.property.map((o) => o.id));
      expect(c.options.phase.map((o) => o.id)).toEqual(base.options.phase.map((o) => o.id));
      expect(c.options.timeline.map((o) => o.id)).toEqual(base.options.timeline.map((o) => o.id));
      expect(c.needServiceOrder).toEqual(base.needServiceOrder);
    }
  });
});
