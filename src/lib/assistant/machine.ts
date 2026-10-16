import type {
  AssistantAnswers,
  AssistantLang,
  AssistantState,
  AssistantStep,
  ClarifyId,
  NeedId,
  PhaseId,
  PropertyId,
  TimelineId,
} from "./types";
import { INITIAL_ANSWERS, INITIAL_STATE } from "./types";

function pushHistory(state: AssistantState): AssistantStep[] {
  return [...state.history, state.step];
}

function go(state: AssistantState, step: AssistantStep, answers: AssistantAnswers): AssistantState {
  return { step, answers, history: pushHistory(state) };
}

/** Após “ainda não tenho a certeza”, mapeia a clarificação para o serviço mais próximo. */
export function needFromClarify(clarify: ClarifyId): NeedId {
  switch (clarify) {
    case "new_build":
      return "buildings";
    case "renovate":
      return "renovations";
    case "exterior":
      return "etics";
    case "paint_finish":
      return "painting";
    case "still_unsure":
      return "unsure";
  }
}

function afterNeed(state: AssistantState, answers: AssistantAnswers): AssistantState {
  if (answers.need === "other") return go(state, "otherService", answers);
  if (answers.need === "unsure") return go(state, "clarify", answers);
  return go(state, "property", answers);
}

export function selectLanguage(state: AssistantState, lang: AssistantLang): AssistantState {
  return go(state, "need", { ...state.answers, chatLang: lang });
}

export function selectNeed(state: AssistantState, need: NeedId): AssistantState {
  return afterNeed(state, { ...state.answers, need, clarify: null, otherService: need === "other" ? state.answers.otherService : "" });
}

export function selectClarify(state: AssistantState, clarify: ClarifyId): AssistantState {
  const need = needFromClarify(clarify);
  return go(state, "property", { ...state.answers, clarify, need });
}

export function submitOtherService(state: AssistantState, text: string): AssistantState {
  const trimmed = text.trim();
  if (!trimmed) return state;
  return go(state, "property", { ...state.answers, otherService: trimmed, need: "other" });
}

export function selectProperty(state: AssistantState, property: PropertyId): AssistantState {
  return go(state, "location", { ...state.answers, property });
}

export function submitLocation(state: AssistantState, location: string): AssistantState {
  const trimmed = location.trim();
  if (!trimmed) return state;
  return go(state, "description", { ...state.answers, location: trimmed });
}

export function submitDescription(state: AssistantState, description: string): AssistantState {
  return go(state, "scope", { ...state.answers, description: description.trim() });
}

export function submitScope(state: AssistantState, scope: string): AssistantState {
  return go(state, "phase", { ...state.answers, scope: scope.trim() });
}

export function selectPhase(state: AssistantState, phase: PhaseId): AssistantState {
  return go(state, "timeline", { ...state.answers, phase });
}

export function selectTimeline(state: AssistantState, timeline: TimelineId): AssistantState {
  return go(state, "summary", { ...state.answers, timeline });
}

export function goToPreview(state: AssistantState): AssistantState {
  return go(state, "preview", state.answers);
}

export function goBack(state: AssistantState): AssistantState {
  if (state.history.length === 0) return state;
  const history = [...state.history];
  const step = history.pop()!;
  return { step, answers: state.answers, history };
}

export function restart(): AssistantState {
  return {
    ...INITIAL_STATE,
    answers: { ...INITIAL_ANSWERS },
  };
}

export function restartKeepingLanguage(state: AssistantState): AssistantState {
  const lang = state.answers.chatLang;
  if (!lang) return restart();
  return {
    step: "need",
    answers: { ...INITIAL_ANSWERS, chatLang: lang },
    history: ["language"],
  };
}

export function changeLanguage(): AssistantState {
  return {
    step: "language",
    answers: { ...INITIAL_ANSWERS },
    history: [],
  };
}

/** Passos editáveis a partir do resumo. */
export function jumpToStep(state: AssistantState, step: AssistantStep): AssistantState {
  if (step === "summary" || step === "preview") return state;
  return go(state, step, state.answers);
}

export function serializeState(state: AssistantState): string {
  return JSON.stringify(state);
}

export function parseState(raw: string | null): AssistantState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<AssistantState>;
    if (!value || typeof value.step !== "string" || !value.answers) return null;
    return {
      step: value.step as AssistantStep,
      answers: { ...INITIAL_ANSWERS, ...value.answers },
      history: Array.isArray(value.history) ? (value.history as AssistantStep[]) : [],
    };
  } catch {
    return null;
  }
}
