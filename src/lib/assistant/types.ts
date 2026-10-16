import type { Lang, ServiceId } from "@/i18n/content";

export type AssistantLang = Lang;

export type NeedId = ServiceId | "other" | "unsure";

export type PropertyId = "home" | "commercial" | "other" | "unknown";

export type ClarifyId = "new_build" | "renovate" | "exterior" | "paint_finish" | "still_unsure";

export type PhaseId = "preparing" | "evaluation" | "defined" | "question";

export type TimelineId = "asap" | "months" | "planning" | "undefined";

export type AssistantStep =
  | "language"
  | "need"
  | "clarify"
  | "otherService"
  | "property"
  | "location"
  | "description"
  | "scope"
  | "phase"
  | "timeline"
  | "summary"
  | "preview";

export type AssistantAnswers = {
  chatLang: AssistantLang | null;
  need: NeedId | null;
  clarify: ClarifyId | null;
  otherService: string;
  property: PropertyId | null;
  location: string;
  description: string;
  scope: string;
  phase: PhaseId | null;
  timeline: TimelineId | null;
};

export type AssistantState = {
  step: AssistantStep;
  answers: AssistantAnswers;
  history: AssistantStep[];
};

export const INITIAL_ANSWERS: AssistantAnswers = {
  chatLang: null,
  need: null,
  clarify: null,
  otherService: "",
  property: null,
  location: "",
  description: "",
  scope: "",
  phase: null,
  timeline: null,
};

export const INITIAL_STATE: AssistantState = {
  step: "language",
  answers: { ...INITIAL_ANSWERS },
  history: [],
};
