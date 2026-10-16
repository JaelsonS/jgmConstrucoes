import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { DICT, isLang, type Lang } from "@/i18n/content";
import {
  ASSISTANT_CONTENT,
  ASSISTANT_SESSION_KEY,
  MAX_DESCRIPTION,
  MAX_SHORT_TEXT,
} from "@/i18n/assistant-content";
import {
  changeLanguage,
  goBack,
  goToPreview,
  jumpToStep,
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
import {
  buildDirectWhatsAppMessage,
  buildQuoteWhatsAppMessage,
  buildSummaryRows,
} from "@/lib/assistant/message";
import type {
  AssistantLang,
  AssistantState,
  ClarifyId,
  NeedId,
  PhaseId,
  PropertyId,
  TimelineId,
} from "@/lib/assistant/types";
import { INITIAL_STATE } from "@/lib/assistant/types";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import { hasWhatsAppConfigured } from "@/config/contacts";

function usePageLang(): Lang {
  const params = useParams({ strict: false }) as { lang?: string };
  return params.lang && isLang(params.lang) ? params.lang : "pt";
}

const ASSISTANT_STORE_EVENT = "jgm-assistant-change";

let sessionCacheRaw: string | null | undefined;
let sessionCacheState: AssistantState = INITIAL_STATE;

function readSessionState(): AssistantState {
  if (typeof window === "undefined") return INITIAL_STATE;
  const raw = sessionStorage.getItem(ASSISTANT_SESSION_KEY);
  if (raw === sessionCacheRaw) return sessionCacheState;
  sessionCacheRaw = raw;
  sessionCacheState = parseState(raw) ?? INITIAL_STATE;
  return sessionCacheState;
}

function subscribeSession(onChange: () => void) {
  const notify = () => {
    sessionCacheRaw = undefined;
    onChange();
  };
  window.addEventListener(ASSISTANT_STORE_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(ASSISTANT_STORE_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

function saveSession(state: AssistantState) {
  if (typeof window === "undefined") return;
  const raw = serializeState(state);
  sessionStorage.setItem(ASSISTANT_SESSION_KEY, raw);
  sessionCacheRaw = raw;
  sessionCacheState = state;
  window.dispatchEvent(new Event(ASSISTANT_STORE_EVENT));
}

function OptionButton({
  children,
  onClick,
  selected,
}: {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-sm border px-3 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background hover:border-primary/60 hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function TextStep({
  label,
  placeholder,
  value,
  maxLength,
  optional,
  optionalHint,
  continueLabel,
  skipLabel,
  errorRequired,
  errorTooLong,
  onSubmit,
  onSkip,
}: {
  label: string;
  placeholder: string;
  value: string;
  maxLength: number;
  optional?: boolean;
  optionalHint?: string;
  continueLabel: string;
  skipLabel?: string;
  errorRequired: string;
  errorTooLong: string;
  onSubmit: (value: string) => void;
  onSkip?: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();
  const errorId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!optional && !trimmed) {
      setError(errorRequired);
      return;
    }
    if (trimmed.length > maxLength) {
      setError(errorTooLong);
      return;
    }
    setError(null);
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor={inputId} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      {optional && optionalHint && (
        <p className="text-xs text-muted-foreground">{optionalHint}</p>
      )}
      <textarea
        id={inputId}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          if (error) setError(null);
        }}
        placeholder={placeholder}
        maxLength={maxLength + 20}
        rows={3}
        className="w-full resize-y rounded-sm border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary min-h-10 px-4 text-sm">
          {continueLabel}
        </button>
        {onSkip && skipLabel && (
          <button
            type="button"
            className="btn btn-outline min-h-10 px-4 text-sm"
            onClick={onSkip}
          >
            {skipLabel}
          </button>
        )}
      </div>
    </form>
  );
}

export function SalesAssistant() {
  const pageLang = usePageLang();
  const [open, setOpen] = useState(false);
  const state = useSyncExternalStore(subscribeSession, readSessionState, () => INITIAL_STATE);
  const [openedNote, setOpenedNote] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const chatLang: AssistantLang = state.answers.chatLang ?? pageLang;
  const t = ASSISTANT_CONTENT[chatLang];
  const ui = ASSISTANT_CONTENT[pageLang];
  const serviceNames = DICT[chatLang].services;

  const update = (next: AssistantState) => {
    setOpenedNote(false);
    saveSession(next);
  };

  const openDirectWhatsApp = () => {
    const msg = buildDirectWhatsAppMessage(ASSISTANT_CONTENT[chatLang]);
    const ok = openWhatsApp(msg);
    if (ok) setOpenedNote(true);
  };

  const openPreparedWhatsApp = () => {
    const msg = buildQuoteWhatsAppMessage(state.answers, t);
    const ok = openWhatsApp(msg);
    if (ok) setOpenedNote(true);
  };

  const summaryRows = buildSummaryRows(state.answers, t);
  const previewMessage = buildQuoteWhatsAppMessage(state.answers, t);
  const whatsappReady = hasWhatsAppConfigured() && !!buildWhatsAppUrl("ok");

  const renderStep = () => {
    switch (state.step) {
      case "language":
        return (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-foreground">{ui.welcome}</p>
            <p className="text-xs text-muted-foreground">{ui.languagePrompt}</p>
            <div className="space-y-2">
              {(["pt", "en", "es"] as const).map((lang) => (
                <OptionButton key={lang} onClick={() => update(selectLanguage(state, lang))}>
                  {ui.languages[lang]}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "need":
        return (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t.needPrompt}</p>
            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
              {t.needServiceOrder.map((id) => (
                <OptionButton key={id} onClick={() => update(selectNeed(state, id as NeedId))}>
                  {serviceNames[id].name}
                </OptionButton>
              ))}
              {t.options.needExtra.map((opt) => (
                <OptionButton key={opt.id} onClick={() => update(selectNeed(state, opt.id))}>
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "clarify":
        return (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t.clarifyPrompt}</p>
            <div className="space-y-2">
              {t.options.clarify.map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => update(selectClarify(state, opt.id as ClarifyId))}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "otherService":
        return (
          <TextStep
            key="otherService"
            label={t.otherPrompt}
            placeholder={t.otherPlaceholder}
            value={state.answers.otherService}
            maxLength={MAX_SHORT_TEXT}
            continueLabel={t.otherContinue}
            errorRequired={t.errors.required}
            errorTooLong={t.errors.tooLong}
            onSubmit={(value) => update(submitOtherService(state, value))}
          />
        );
      case "property":
        return (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t.propertyPrompt}</p>
            <div className="space-y-2">
              {t.options.property.map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => update(selectProperty(state, opt.id as PropertyId))}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-2">
            <TextStep
              key="location"
              label={t.locationPrompt}
              placeholder={t.locationPlaceholder}
              value={state.answers.location}
              maxLength={MAX_SHORT_TEXT}
              continueLabel={t.locationContinue}
              errorRequired={t.errors.required}
              errorTooLong={t.errors.tooLong}
              onSubmit={(value) => update(submitLocation(state, value))}
            />
            <p className="text-xs text-muted-foreground">{t.locationHint}</p>
          </div>
        );
      case "description":
        return (
          <TextStep
            key="description"
            label={t.descriptionPrompt}
            placeholder={t.descriptionPlaceholder}
            value={state.answers.description}
            maxLength={MAX_DESCRIPTION}
            optional
            optionalHint={t.descriptionOptional}
            continueLabel={t.descriptionContinue}
            errorRequired={t.errors.required}
            errorTooLong={t.errors.tooLong}
            onSubmit={(value) => update(submitDescription(state, value))}
          />
        );
      case "scope":
        return (
          <TextStep
            key="scope"
            label={t.scopePrompt}
            placeholder={t.scopePlaceholder}
            value={state.answers.scope}
            maxLength={MAX_SHORT_TEXT}
            optional
            continueLabel={t.scopeContinue}
            skipLabel={t.scopeSkip}
            errorRequired={t.errors.required}
            errorTooLong={t.errors.tooLong}
            onSubmit={(value) => update(submitScope(state, value))}
            onSkip={() => update(submitScope(state, ""))}
          />
        );
      case "phase":
        return (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t.phasePrompt}</p>
            <div className="space-y-2">
              {t.options.phase.map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => update(selectPhase(state, opt.id as PhaseId))}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "timeline":
        return (
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t.timelinePrompt}</p>
            <div className="space-y-2">
              {t.options.timeline.map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => update(selectTimeline(state, opt.id as TimelineId))}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case "summary":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{t.summaryIntro}</p>
            <dl className="space-y-2 rounded-sm border border-border bg-muted/60 p-3 text-sm">
              {summaryRows.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm">{t.summaryAsk}</p>
            <div className="space-y-2">
              <OptionButton onClick={() => update(goToPreview(state))}>{t.nextWhatsApp}</OptionButton>
              <OptionButton onClick={openDirectWhatsApp}>{t.nextDirect}</OptionButton>
              <OptionButton onClick={() => update(jumpToStep(state, "need"))}>
                {t.editAnswers}
              </OptionButton>
            </div>
          </div>
        );
      case "preview":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{t.preClose}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t.previewLabel}
              </p>
              <pre className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-sm border border-border bg-muted/60 p-3 font-sans text-xs leading-relaxed text-foreground">
                {previewMessage}
              </pre>
            </div>
            {whatsappReady ? (
              <button
                type="button"
                className="btn btn-primary w-full min-h-11 text-sm"
                onClick={openPreparedWhatsApp}
              >
                <Send aria-hidden="true" size={16} />
                {t.openWhatsApp}
              </button>
            ) : (
              <p className="text-sm text-destructive" role="alert">
                {t.whatsappNotConfigured}
              </p>
            )}
            {openedNote && (
              <p className="text-xs text-muted-foreground" role="status">
                {t.whatsappOpenedNote}
              </p>
            )}
            <OptionButton onClick={() => update(jumpToStep(state, "summary"))}>
              {t.back}
            </OptionButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-5 md:right-5">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto flex max-h-[min(70vh,34rem)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-sm border border-border bg-background shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 border-b border-border bg-ink px-4 py-3 text-ink-foreground">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky">
                {t.badge}
              </p>
              <h2 id={titleId} className="mt-1 font-display text-base font-semibold">
                {t.launcher.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm p-1.5 text-ink-foreground/80 hover:bg-ink-foreground/10 hover:text-ink-foreground focus-visible:outline-2 focus-visible:outline-sky"
              aria-label={t.launcher.close}
            >
              <X aria-hidden="true" size={18} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4">{renderStep()}</div>

          <footer className="space-y-2 border-t border-border px-3 py-3">
            <div className="flex flex-wrap gap-1">
              {state.history.length > 0 && state.step !== "language" && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                  onClick={() => update(goBack(state))}
                >
                  <ArrowLeft aria-hidden="true" size={14} />
                  {t.back}
                </button>
              )}
              {state.answers.chatLang && (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    onClick={() => update(restartKeepingLanguage(state))}
                  >
                    <RotateCcw aria-hidden="true" size={14} />
                    {t.restart}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                    onClick={() => update(changeLanguage())}
                  >
                    {t.changeLanguage}
                  </button>
                </>
              )}
              {!state.answers.chatLang && state.step !== "language" && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                  onClick={() => update(restart())}
                >
                  <RotateCcw aria-hidden="true" size={14} />
                  {ui.restart}
                </button>
              )}
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              onClick={openDirectWhatsApp}
            >
              <MessageCircle aria-hidden="true" size={15} />
              {state.answers.chatLang ? t.directContact : ui.directContact}
            </button>
            {openedNote && state.step !== "preview" && (
              <p className="text-[0.65rem] text-muted-foreground" role="status">
                {state.answers.chatLang ? t.whatsappOpenedNote : ui.whatsappOpenedNote}
              </p>
            )}
          </footer>
        </div>
      )}

      <button
        type="button"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-ink text-ink-foreground shadow-lg transition hover:border-sky hover:text-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={open ? ui.launcher.close : ui.launcher.open}
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" size={20} /> : <MessageCircle aria-hidden="true" size={20} />}
      </button>
    </div>
  );
}
