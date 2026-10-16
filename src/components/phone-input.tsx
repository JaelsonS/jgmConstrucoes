import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { Lang } from "@/i18n/content";
import {
  PHONE_COUNTRIES,
  countryDisplayName,
  isOptionalPhoneValid,
  splitPhoneValue,
  toE164,
  type PhoneCountryCode,
} from "@/lib/phone";

export type PhoneInputCopy = {
  country: string;
  search: string;
  searchPlaceholder: string;
  number: string;
  invalid: string;
  noResults: string;
};

type PhoneInputProps = {
  name?: string;
  lang: Lang;
  copy: PhoneInputCopy;
  label: string;
  optionalHint?: string;
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  error?: string | undefined;
  onValueChange?: ((e164: string) => void) | undefined;
};

export function PhoneInput({
  name = "phone",
  lang,
  copy,
  label,
  optionalHint,
  defaultValue = "",
  className = "",
  inputClassName = "",
  error,
  onValueChange,
}: PhoneInputProps) {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const searchId = `${baseId}-search`;
  const numberId = `${baseId}-number`;
  const errorId = `${baseId}-error`;
  const rootRef = useRef<HTMLDivElement>(null);

  const initial = useMemo(() => splitPhoneValue(defaultValue), [defaultValue]);
  const [country, setCountry] = useState<PhoneCountryCode>(initial.country);
  const [national, setNational] = useState(initial.national);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);

  const selected = PHONE_COUNTRIES.find((c) => c.iso === country) ?? PHONE_COUNTRIES[0]!;
  const e164 = toE164(national, country);
  const showInvalid =
    touched && national.trim().length > 0 && !isOptionalPhoneValid(e164 || national, country);
  const errorText = error || (showInvalid ? copy.invalid : undefined);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter((c) => {
      const nameLabel = countryDisplayName(c.iso, lang).toLowerCase();
      return (
        nameLabel.includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.dial.replace("+", "").includes(q)
      );
    });
  }, [query, lang]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const emit = (nextNational: string, nextCountry: PhoneCountryCode) => {
    onValueChange?.(toE164(nextNational, nextCountry));
  };

  const onNationalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setNational(next);
    emit(next, country);
  };

  const pickCountry = (iso: PhoneCountryCode) => {
    setCountry(iso);
    setOpen(false);
    setQuery("");
    emit(national, iso);
  };

  return (
    <div className={className} ref={rootRef}>
      <span className="text-sm font-semibold">
        {label}
        {optionalHint ? (
          <span className="font-normal text-muted-foreground"> {optionalHint}</span>
        ) : null}
      </span>
      <div className="relative mt-2">
        <div
          className={`flex overflow-hidden rounded-sm border bg-background ${
            errorText ? "border-destructive" : "border-input focus-within:border-primary"
          }`}
        >
          <button
            type="button"
            className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-1.5 border-r border-input bg-muted/40 px-3 text-sm transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
            aria-label={copy.country}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {selected.flag}
            </span>
            <span className="font-medium tabular-nums text-foreground">{selected.dial}</span>
            <ChevronDown aria-hidden="true" size={14} strokeWidth={1.75} className="text-muted-foreground" />
          </button>
          <input
            id={numberId}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={national}
            onChange={onNationalChange}
            onBlur={() => setTouched(true)}
            className={`min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none ${inputClassName}`}
            aria-invalid={!!errorText}
            aria-describedby={errorText ? errorId : undefined}
            aria-label={copy.number}
          />
        </div>
        <input type="hidden" name={name} value={e164} />

        {open && (
          <div
            id={listId}
            role="listbox"
            aria-label={copy.country}
            className="absolute z-20 mt-1 max-h-64 w-full overflow-hidden rounded-sm border border-border bg-background shadow-lg"
          >
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search aria-hidden="true" size={14} strokeWidth={1.75} className="text-muted-foreground" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none"
                aria-label={copy.search}
                autoComplete="off"
              />
            </div>
            <ul className="max-h-48 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted-foreground">{copy.noResults}</li>
              )}
              {filtered.map((c) => {
                const active = c.iso === country;
                return (
                  <li key={c.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-muted focus-visible:bg-muted focus-visible:outline-none ${
                        active ? "bg-muted/80 font-medium" : ""
                      }`}
                      onClick={() => pickCountry(c.iso)}
                    >
                      <span aria-hidden="true">{c.flag}</span>
                      <span className="flex-1">{countryDisplayName(c.iso, lang)}</span>
                      <span className="tabular-nums text-muted-foreground">{c.dial}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {errorText && (
        <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}

export function validatePhoneField(value: string, invalidMessage: string): string | undefined {
  if (!value.trim()) return undefined;
  return isOptionalPhoneValid(value) ? undefined : invalidMessage;
}
