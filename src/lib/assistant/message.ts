import { DICT, type ServiceId } from "@/i18n/content";
import type { AssistantContent } from "@/i18n/assistant-content";
import type { AssistantAnswers, AssistantLang, NeedId } from "./types";

function serviceLabel(lang: AssistantLang, need: NeedId | null, other: string, t: AssistantContent): string | null {
  if (!need) return null;
  if (need === "other") return other.trim() || t.labels.otherService;
  if (need === "unsure") return t.labels.unsure;
  return DICT[lang].services[need as ServiceId].name;
}

function optionLabel(
  map: Record<string, string>,
  id: string | null,
): string | null {
  if (!id) return null;
  return map[id] ?? null;
}

export type SummaryRows = { label: string; value: string }[];

/** Linhas do resumo — só com dados realmente recolhidos. */
export function buildSummaryRows(answers: AssistantAnswers, t: AssistantContent): SummaryRows {
  const lang = answers.chatLang ?? "pt";
  const rows: SummaryRows = [];

  const service = serviceLabel(lang, answers.need, answers.otherService, t);
  if (service) rows.push({ label: t.summary.service, value: service });

  if (answers.clarify && answers.need !== "other") {
    const clarify = t.options.clarify.find((o) => o.id === answers.clarify);
    if (clarify) rows.push({ label: t.summary.clarify, value: clarify.label });
  }

  const property = optionLabel(
    Object.fromEntries(t.options.property.map((o) => [o.id, o.label])),
    answers.property,
  );
  if (property) rows.push({ label: t.summary.property, value: property });

  if (answers.location.trim()) rows.push({ label: t.summary.location, value: answers.location.trim() });
  if (answers.description.trim()) rows.push({ label: t.summary.description, value: answers.description.trim() });
  if (answers.scope.trim()) rows.push({ label: t.summary.scope, value: answers.scope.trim() });

  const phase = optionLabel(
    Object.fromEntries(t.options.phase.map((o) => [o.id, o.label])),
    answers.phase,
  );
  if (phase) rows.push({ label: t.summary.phase, value: phase });

  const timeline = optionLabel(
    Object.fromEntries(t.options.timeline.map((o) => [o.id, o.label])),
    answers.timeline,
  );
  if (timeline) rows.push({ label: t.summary.timeline, value: timeline });

  return rows;
}

/** Mensagem pré-preenchida para WhatsApp (pedido completo). */
export function buildQuoteWhatsAppMessage(answers: AssistantAnswers, t: AssistantContent): string {
  const rows = buildSummaryRows(answers, t);
  const lines = [t.whatsapp.intro, ""];
  for (const row of rows) {
    lines.push(`${row.label}: ${row.value}`);
  }
  lines.push("", t.whatsapp.outro);
  return lines.join("\n");
}

/** Mensagem curta para contacto direto com o responsável. */
export function buildDirectWhatsAppMessage(t: AssistantContent): string {
  return t.whatsapp.direct;
}
