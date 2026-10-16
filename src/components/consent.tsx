import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Cookie, Settings2, X } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { isLang, type Lang } from "@/i18n/content";
import { EXTRA_CONTENT } from "@/i18n/extended-content";

const STORAGE_KEY = "jgm-consent-v1";
const CONSENT_EVENT = "jgm-consent-change";
const OPEN_EVENT = "jgm-consent-open";

export type ConsentPreferences = {
  necessary: true;
  external: boolean;
};

/** Cache estável para useSyncExternalStore (Object.is) — evita React #185. */
let cachedRaw: string | null = null;
let cachedPrefs: ConsentPreferences | null = null;

function getPreferencesSnapshot(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedPrefs;
  cachedRaw = raw;
  try {
    const value = JSON.parse(raw ?? "null") as Partial<ConsentPreferences> | null;
    cachedPrefs =
      value && typeof value.external === "boolean"
        ? { necessary: true, external: value.external }
        : null;
  } catch {
    cachedPrefs = null;
  }
  return cachedPrefs;
}

function invalidatePreferencesCache() {
  cachedRaw = null;
}

function subscribePreferences(onChange: () => void) {
  const notify = () => {
    invalidatePreferencesCache();
    onChange();
  };
  window.addEventListener(CONSENT_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(CONSENT_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

function persist(preferences: ConsentPreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  invalidatePreferencesCache();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: preferences }));
}

export function useConsent() {
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    () => null,
  );
  return {
    preferences,
    allowExternal: () => persist({ necessary: true, external: true }),
  };
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function useConsentLang(): Lang {
  const params = useParams({ strict: false }) as { lang?: string };
  return params.lang && isLang(params.lang) ? params.lang : "pt";
}

/** Controlo discreto (canto inferior esquerdo) para reabrir preferências. */
function ConsentPreferencesTrigger({
  visible,
  label,
}: {
  visible: boolean;
  label: string;
}) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="fixed bottom-4 left-4 z-[60] flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-background/95 text-foreground shadow-md backdrop-blur-sm transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:bottom-5 md:left-5"
      aria-label={label}
      title={label}
    >
      <Cookie aria-hidden="true" size={18} strokeWidth={1.75} />
    </button>
  );
}

export function ConsentManager() {
  const lang = useConsentLang();
  const t = EXTRA_CONTENT[lang].consent;
  const titleId = useId();
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    () => null,
  );
  const [manualOpen, setManualOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [external, setExternal] = useState(false);

  useEffect(() => {
    const show = () => {
      setExternal(getPreferencesSnapshot()?.external ?? false);
      setCustomising(true);
      setManualOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const hasStoredChoice = preferences !== null;
  const panelOpen = manualOpen || !hasStoredChoice;

  const choose = (value: boolean) => {
    persist({ necessary: true, external: value });
    setManualOpen(false);
    setCustomising(false);
  };

  return (
    <>
      <ConsentPreferencesTrigger visible={hasStoredChoice && !panelOpen} label={t.reopen} />
      {panelOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-sm border border-border bg-background p-5 shadow-2xl md:bottom-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-display text-lg font-semibold">
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
            </div>
            {hasStoredChoice && (
              <button
                type="button"
                onClick={() => {
                  setManualOpen(false);
                  setCustomising(false);
                }}
                className="rounded-sm p-2 focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={t.close}
              >
                <X aria-hidden="true" size={18} />
              </button>
            )}
          </div>
          {customising && (
            <div className="mt-5 space-y-3 border-y border-border py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <strong className="text-sm">{t.necessary}</strong>
                  <p className="text-xs text-muted-foreground">{t.necessaryText}</p>
                </div>
                <span className="text-xs font-semibold text-primary-text">ON</span>
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <strong className="text-sm">{t.external}</strong>
                  <span className="block text-xs text-muted-foreground">{t.externalText}</span>
                </span>
                <input
                  type="checkbox"
                  checked={external}
                  onChange={(event) => setExternal(event.target.checked)}
                  className="mt-1 h-5 w-5 accent-primary"
                />
              </label>
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {customising ? (
              <button type="button" className="btn btn-primary" onClick={() => choose(external)}>
                {t.save}
              </button>
            ) : (
              <>
                <button type="button" className="btn btn-primary" onClick={() => choose(true)}>
                  {t.accept}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => choose(false)}>
                  {t.reject}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setExternal(getPreferencesSnapshot()?.external ?? false);
                    setCustomising(true);
                  }}
                >
                  <Settings2 aria-hidden="true" size={16} />
                  {t.customise}
                </button>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
