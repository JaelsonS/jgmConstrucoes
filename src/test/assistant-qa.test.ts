import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ASSISTANT_CONTENT } from "@/i18n/assistant-content";
import { LANGS } from "@/i18n/content";
import { CONTACTS, whatsappTelUri } from "@/config/contacts";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  changeLanguage,
  goBack,
  goToPreview,
  jumpToStep,
  needFromClarify,
  parseState,
  restart,
  restartKeepingLanguage,
  selectClarify,
  selectLanguage,
  selectNeed,
  selectPhase,
  selectProperty,
  selectTimeline,
  serializeState,
  submitDescription,
  submitLocation,
  submitOtherService,
  submitScope,
} from "@/lib/assistant/machine";
import { INITIAL_ANSWERS, INITIAL_STATE, type AssistantAnswers } from "@/lib/assistant/types";
import {
  buildDirectWhatsAppMessage,
  buildQuoteWhatsAppMessage,
  buildSummaryRows,
} from "@/lib/assistant/message";

function runToSummary(overrides: Partial<AssistantAnswers> = {}) {
  let s = selectLanguage(INITIAL_STATE, overrides.chatLang ?? "pt");
  s = selectNeed(s, overrides.need ?? "renovations");
  if (s.step === "otherService") {
    s = submitOtherService(s, overrides.otherService || "Serviço personalizado");
  }
  if (s.step === "clarify") {
    s = selectClarify(s, overrides.clarify ?? "renovate");
  }
  s = selectProperty(s, overrides.property ?? "home");
  s = submitLocation(s, overrides.location ?? "Adémia, Coimbra");
  s = submitDescription(s, overrides.description ?? "Renovação de casa de banho");
  s = submitScope(s, overrides.scope ?? "1 divisão");
  s = selectPhase(s, overrides.phase ?? "evaluation");
  s = selectTimeline(s, overrides.timeline ?? "months");
  return s;
}

describe("state machine transitions", () => {
  it("walks every main step in order for a known service", () => {
    let s = selectLanguage(INITIAL_STATE, "pt");
    expect(s.step).toBe("need");
    s = selectNeed(s, "lsf");
    expect(s.step).toBe("property");
    s = selectProperty(s, "commercial");
    expect(s.step).toBe("location");
    s = submitLocation(s, "Figueira da Foz");
    expect(s.step).toBe("description");
    s = submitDescription(s, "");
    expect(s.step).toBe("scope");
    s = submitScope(s, "");
    expect(s.step).toBe("phase");
    s = selectPhase(s, "question");
    expect(s.step).toBe("timeline");
    s = selectTimeline(s, "planning");
    expect(s.step).toBe("summary");
    s = goToPreview(s);
    expect(s.step).toBe("preview");
  });

  it("maps every clarify option to a need", () => {
    expect(needFromClarify("new_build")).toBe("buildings");
    expect(needFromClarify("renovate")).toBe("renovations");
    expect(needFromClarify("exterior")).toBe("etics");
    expect(needFromClarify("paint_finish")).toBe("painting");
    expect(needFromClarify("still_unsure")).toBe("unsure");
  });

  it("rejects empty other-service and empty location without advancing", () => {
    let s = selectLanguage(INITIAL_STATE, "en");
    s = selectNeed(s, "other");
    expect(submitOtherService(s, "   ")).toEqual(s);
    s = submitOtherService(s, "Facade repair");
    expect(s.step).toBe("property");
    s = selectProperty(s, "other");
    expect(submitLocation(s, "")).toEqual(s);
    expect(submitLocation(s, "  ")).toEqual(s);
  });

  it("goes back through history without inventing answers", () => {
    let s = runToSummary();
    expect(s.step).toBe("summary");
    s = goBack(s);
    expect(s.step).toBe("timeline");
    expect(s.answers.location).toBe("Adémia, Coimbra");
    s = goBack(s);
    expect(s.step).toBe("phase");
    while (s.history.length > 0) s = goBack(s);
    expect(s.step).toBe("language");
    expect(goBack(s)).toEqual(s);
  });

  it("jumpToStep from summary allows correcting the need", () => {
    let s = runToSummary();
    s = jumpToStep(s, "need");
    expect(s.step).toBe("need");
    expect(s.answers.location).toBe("Adémia, Coimbra");
  });

  it("returns from preview to summary", () => {
    let s = runToSummary();
    s = goToPreview(s);
    expect(s.step).toBe("preview");
    s = goBack(s);
    expect(s.step).toBe("summary");
    s = goToPreview(s);
    s = jumpToStep(s, "summary");
    expect(s.step).toBe("summary");
  });

  it("restart clears answers; restartKeepingLanguage keeps chat language", () => {
    const s = runToSummary({ chatLang: "es" });
    const kept = restartKeepingLanguage(s);
    expect(kept.answers.chatLang).toBe("es");
    expect(kept.answers.location).toBe("");
    expect(kept.step).toBe("need");
    expect(restart().step).toBe("language");
    expect(changeLanguage().answers).toEqual(INITIAL_ANSWERS);
  });
});

describe("WhatsApp message construction", () => {
  it("omits optional empty fields and preserves newlines and accents", () => {
    const answers: AssistantAnswers = {
      ...INITIAL_ANSWERS,
      chatLang: "pt",
      need: "painting",
      property: "home",
      location: "São João da Madeira",
      description: "Pintura exterior — fachada com humidade",
      scope: "",
      phase: "preparing",
      timeline: "asap",
    };
    const t = ASSISTANT_CONTENT.pt;
    const rows = buildSummaryRows(answers, t);
    expect(rows.map((r) => r.label)).not.toContain(t.summary.scope);
    expect(rows.every((r) => r.value.trim().length > 0)).toBe(true);

    const message = buildQuoteWhatsAppMessage(answers, t);
    expect(message).toContain("\n");
    expect(message).toContain("São João da Madeira");
    expect(message).toContain("humidade");
    expect(message).not.toMatch(/\[.+\]/);
    expect(message).not.toContain("undefined");
    expect(message).not.toContain("null");

    const url = buildWhatsAppUrl(message)!;
    expect(url.startsWith("https://wa.me/351911040509?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toBe(message);
  });

  it("includes other-service description instead of a generic label when provided", () => {
    const answers: AssistantAnswers = {
      ...INITIAL_ANSWERS,
      chatLang: "en",
      need: "other",
      otherService: "Damp survey only",
      property: "unknown",
      location: "Lisbon",
      description: "",
      phase: "question",
      timeline: "undefined",
    };
    const message = buildQuoteWhatsAppMessage(answers, ASSISTANT_CONTENT.en);
    expect(message).toContain("Damp survey only");
    expect(message).not.toContain("Another service");
    expect(message).not.toContain(ASSISTANT_CONTENT.en.summary.description + ":");
  });

  it("localizes quote and direct messages without mixing languages", () => {
    for (const lang of LANGS) {
      const t = ASSISTANT_CONTENT[lang];
      const quote = buildQuoteWhatsAppMessage(
        {
          ...INITIAL_ANSWERS,
          chatLang: lang,
          need: "etics",
          property: "home",
          location: "Coimbra",
          description: "Capoto",
          phase: "evaluation",
          timeline: "months",
        },
        t,
      );
      const direct = buildDirectWhatsAppMessage(t);
      expect(quote.startsWith(t.whatsapp.intro)).toBe(true);
      expect(quote.endsWith(t.whatsapp.outro)).toBe(true);
      expect(direct).toBe(t.whatsapp.direct);
      for (const other of LANGS.filter((l) => l !== lang)) {
        expect(quote).not.toContain(ASSISTANT_CONTENT[other].whatsapp.intro);
        expect(direct).not.toContain(ASSISTANT_CONTENT[other].whatsapp.direct);
      }
    }
  });

  it("encodes multiline special characters for Click to Chat", () => {
    const text = "Linha 1\nLinha 2 — café & obra (50%)";
    const url = buildWhatsAppUrl(text)!;
    expect(url).toContain("%0A");
    expect(url).toContain("%26");
    expect(decodeURIComponent(url.split("text=")[1]!)).toBe(text);
  });
});

describe("session persistence helpers", () => {
  it("round-trips serialize/parse and rejects garbage", () => {
    const s = runToSummary({ chatLang: "en", need: "glazing" });
    const restored = parseState(serializeState(s));
    expect(restored?.step).toBe("summary");
    expect(restored?.answers.chatLang).toBe("en");
    expect(restored?.answers.need).toBe("glazing");
    expect(parseState(null)).toBeNull();
    expect(parseState("{not-json")).toBeNull();
    expect(parseState("{}")).toBeNull();
  });
});

describe("contact source of truth", () => {
  it("keeps schema telephone and wa.me number aligned with CONTACTS", () => {
    expect(whatsappTelUri()).toBe(`+${CONTACTS.whatsappE164Digits}`);
    expect(buildWhatsAppUrl()!).toBe(`https://wa.me/${CONTACTS.whatsappE164Digits}`);
    const root = readFileSync(resolve(process.cwd(), "src/routes/__root.tsx"), "utf8");
    expect(root).toContain("whatsappTelUri");
    expect(root).not.toMatch(/telephone:\s*"\+351/);
  });

  it("does not hardcode wa.me numbers outside contacts/whatsapp helpers", () => {
    const files = [
      "src/components/sales-assistant.tsx",
      "src/routes/$lang/$page/index.tsx",
      "src/components/site.tsx",
    ];
    for (const file of files) {
      const src = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(src).not.toMatch(/wa\.me\/\d+/);
      expect(src).not.toMatch(/351911040509/);
    }
  });
});
