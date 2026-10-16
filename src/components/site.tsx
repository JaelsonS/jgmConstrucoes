import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ArrowRight, Plus, Minus, ChevronDown, MapPin } from "lucide-react";
import {
  COMPANY, DICT, LANGS, PAGE_SLUGS, SERVICE_IDS, SERVICE_SLUGS, isLang, pageKeyFromSlug, serviceFromSlug, type Lang, type ServiceId,
} from "@/i18n/content";
import { EXTRA_CONTENT } from "@/i18n/extended-content";
import { SITE_CONFIG, copyrightYears } from "@/config/site";
import { openConsentPreferences } from "./consent";
import logoMark from "@/assets/brand/jgm-mark.png";

export function useLang(): Lang {
  const p = useParams({ strict: false }) as { lang?: string };
  return p.lang && isLang(p.lang) ? p.lang : "pt";
}
export const useT = () => DICT[useLang()];

export const pageHref = (l: Lang, k: keyof (typeof PAGE_SLUGS)["pt"]) => `/${l}/${PAGE_SLUGS[l][k]}`;
export const serviceHref = (l: Lang, s: ServiceId) => `/${l}/${PAGE_SLUGS[l].services}/${SERVICE_SLUGS[l][s]}`;

/** Emblema (já contém JGM) + “Construções” colado, no prata metálico da logótipo. */
function Logo({ light = false, size = "header" }: { light?: boolean; size?: "header" | "footer" }) {
  const markClass = size === "footer"
    ? "h-[3.75rem] w-auto shrink-0 drop-shadow-md md:h-[4.5rem]"
    : "h-12 w-auto shrink-0 drop-shadow-sm md:h-[3.35rem]";
  const wordClass = size === "footer"
    ? "text-[1.35rem] tracking-[0.08em] md:text-[1.55rem]"
    : "text-[1.05rem] tracking-[0.06em] sm:text-[1.15rem] md:text-[1.28rem]";
  return (
    <span className="inline-flex items-center gap-1.5 md:gap-2">
      <img src={logoMark} alt="" width={815} height={830} className={markClass} />
      <span
        aria-hidden="true"
        className={`logo-wordmark font-display font-semibold leading-none ${wordClass} ${light ? "logo-wordmark--light" : "logo-wordmark--dark"}`}
      >
        Construções
      </span>
    </span>
  );
}

function FlagIcon({ lang }: { lang: Lang }) {
  if (lang === "pt") return (
    <svg aria-hidden="true" viewBox="0 0 30 20" className="h-4 w-6 rounded-[2px] shadow-sm">
      <path fill="#046A38" d="M0 0h12v20H0z" /><path fill="#DA291C" d="M12 0h18v20H12z" />
      <circle cx="12" cy="10" r="3.2" fill="#FFCD00" /><circle cx="12" cy="10" r="2" fill="#FFF" />
    </svg>
  );
  if (lang === "en") return (
    <svg aria-hidden="true" viewBox="0 0 30 20" className="h-4 w-6 rounded-[2px] shadow-sm">
      <path fill="#012169" d="M0 0h30v20H0z" /><path stroke="#FFF" strokeWidth="4" d="m0 0 30 20M30 0 0 20" /><path stroke="#C8102E" strokeWidth="2" d="m0 0 30 20M30 0 0 20" /><path stroke="#FFF" strokeWidth="7" d="M15 0v20M0 10h30" /><path stroke="#C8102E" strokeWidth="4" d="M15 0v20M0 10h30" />
    </svg>
  );
  return (
    <svg aria-hidden="true" viewBox="0 0 30 20" className="h-4 w-6 rounded-[2px] shadow-sm">
      <path fill="#AA151B" d="M0 0h30v20H0z" /><path fill="#F1BF00" d="M0 5h30v10H0z" /><circle cx="10" cy="10" r="1.8" fill="#AA151B" />
    </svg>
  );
}

function LangSwitch({ light = true }: { light?: boolean }) {
  const lang = useLang();
  const t = DICT[lang];
  const navigate = useNavigate();
  const pathname = useLocation({ select: (location) => location.pathname });
  const translatedPath = (nextLang: Lang) => {
    const segments = pathname.split("/").filter(Boolean);
    const page = segments[1] ? pageKeyFromSlug(lang, segments[1]) : undefined;
    if (!page) return `/${nextLang}`;
    if (page === "services" && segments[2]) {
      const service = serviceFromSlug(lang, segments[2]);
      if (service) return serviceHref(nextLang, service);
    }
    if (page === "blog" && segments[2]) {
      const index = EXTRA_CONTENT[lang].blog.articles.findIndex((article) => article.slug === segments[2]);
      const slug = EXTRA_CONTENT[nextLang].blog.articles[index]?.slug;
      if (slug) return `/${nextLang}/${PAGE_SLUGS[nextLang].blog}/${slug}`;
    }
    return pageHref(nextLang, page);
  };
  return (
    <div className="flex items-center gap-1" role="group" aria-label={t.nav.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => void navigate({ to: translatedPath(l) })}
          aria-pressed={l === lang}
          aria-label={DICT[l].langName}
          title={DICT[l].langName}
          className={`grid min-h-9 min-w-10 place-items-center rounded-sm border transition ${l === lang ? "border-primary bg-primary/15 ring-1 ring-primary" : light ? "border-white/20 bg-white/5 hover:border-sky" : "border-border bg-card hover:border-primary"}`}
        >
          <FlagIcon lang={l} />
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const lang = useLang();
  const t = DICT[lang].nav;
  const pathname = useLocation({ select: (location) => location.pathname });
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const overlays = Array.from(document.querySelectorAll<HTMLElement>("[data-header-overlay]"));
        const overImage = overlays.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 72 && rect.bottom > 0;
        });
        setScrolled(!overImage);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, servicesOpen]);
  const links = [
    { to: `/${lang}`, l: t.home },
    { to: pageHref(lang, "about"), l: t.about },
    { to: pageHref(lang, "blog"), l: t.blog },
    { to: pageHref(lang, "contact"), l: t.contact },
  ];
  const light = !scrolled && !open;
  const navText = light ? "text-white drop-shadow-sm hover:text-sky" : "text-foreground hover:text-primary";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/95 shadow-sm backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:p-2">{t.skip}</a>
      <div className="container-x flex min-h-[4.5rem] items-center justify-between gap-4 py-3 md:min-h-[5rem]">
        <Link to="/$lang" params={{ lang }} aria-label="JGM Construções" className="min-w-0 shrink">
          <Logo light={light} />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label={t.menu}>
          {links.slice(0, 2).map((x) => <a key={x.to} href={x.to} className={`text-[15px] font-semibold transition-colors ${navText}`}>{x.l}</a>)}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((value) => !value)}
              onFocus={() => setServicesOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                  event.preventDefault();
                  setServicesOpen(true);
                }
              }}
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              className={`flex items-center gap-1 text-[15px] font-semibold transition-colors ${navText}`}
            >
              {t.services}<ChevronDown aria-hidden="true" size={15} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && <div id="services-dropdown" className="absolute left-0 top-full min-w-72 pt-3">
              <div className="max-h-[70vh] overflow-y-auto rounded-sm border border-border bg-background p-2 shadow-2xl">
                <a href={pageHref(lang, "services")} className="block rounded-sm px-3 py-2 text-sm font-bold text-foreground hover:bg-card hover:text-primary">{t.services}</a>
                {SERVICE_IDS.map((service) => <a key={service} href={serviceHref(lang, service)} className="block rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-card hover:text-primary">{DICT[lang].services[service].name}</a>)}
              </div>
            </div>}
          </div>
          {links.slice(2).map((x) => <a key={x.to} href={x.to} className={`text-[15px] font-semibold transition-colors ${navText}`}>{x.l}</a>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch light={light} />
          <a href={pageHref(lang, "contact")} className="btn btn-primary min-h-10 px-4 text-sm">{t.quote}</a>
        </div>
        <button className={`min-h-11 min-w-11 lg:hidden ${light ? "text-white" : "text-foreground"}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? t.close : t.menu}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <div id="mobile-navigation" className="container-x flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto pb-6 lg:hidden">
          {links.slice(0, 2).map((x) => (
            <a key={x.to} href={x.to} onClick={() => setOpen(false)} className="border-b border-border py-3 font-display text-lg font-semibold text-foreground">{x.l}</a>
          ))}
          <p className="pt-3 text-xs font-semibold uppercase tracking-wider text-sky">{t.services}</p>
          <a href={pageHref(lang, "services")} onClick={() => setOpen(false)} className="border-b border-border py-3 font-display text-lg font-semibold text-foreground">{t.services}</a>
          {SERVICE_IDS.map((service) => <a key={service} href={serviceHref(lang, service)} onClick={() => setOpen(false)} className="border-b border-border py-2 pl-4 text-sm font-medium text-muted-foreground">{DICT[lang].services[service].name}</a>)}
          {links.slice(2).map((x) => <a key={x.to} href={x.to} onClick={() => setOpen(false)} className="border-b border-border py-3 font-display text-lg font-semibold text-foreground">{x.l}</a>)}
          <div className="mt-4 flex items-center justify-between"><LangSwitch light={false} /><a href={pageHref(lang, "contact")} className="btn btn-primary">{t.quote}</a></div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const lang = useLang();
  const t = DICT[lang];
  return (
    <footer className="relative z-10 bg-ink text-ink-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light size="footer" />
          <p className="mt-5 text-sm text-ink-muted">{t.footer.desc}</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">{COMPANY.legal}<br />NIF {COMPANY.nif}</p>
        </div>
        <div>
          <h3 className="eyebrow text-sky">{t.footer.services}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICE_IDS.map((s) => <li key={s}><a className="hover:text-primary" href={serviceHref(lang, s)}>{t.services[s].name}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-sky">{t.footer.company}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-primary" href={`/${lang}`}>{t.nav.home}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "about")}>{t.nav.about}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "services")}>{t.nav.services}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "blog")}>{t.nav.blog}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "contact")}>{t.nav.contact}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "careers")}>{t.footer.careers}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-sky">{t.footer.legal}</h3>
          <address className="mt-4 flex gap-2 text-sm not-italic text-ink-muted">
            <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary" />
            <span>{COMPANY.address.map((a) => <span key={a}>{a}<br /></span>)}</span>
          </address>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-primary" href={pageHref(lang, "privacy")}>{t.footer.privacy}</a></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "cookies")}>{t.footer.cookies}</a></li>
            <li><button type="button" onClick={openConsentPreferences} className="hover:text-primary">{t.footer.preferences}</button></li>
            <li><a className="hover:text-primary" href={pageHref(lang, "terms")}>{t.footer.terms}</a></li>
            <li><a className="hover:text-primary" href={SITE_CONFIG.complaintsUrl} target="_blank" rel="noopener noreferrer">{t.footer.complaints}</a></li>
            {SITE_CONFIG.googleReviewUrl && <li><a className="hover:text-primary" href={SITE_CONFIG.googleReviewUrl} target="_blank" rel="noopener noreferrer">{t.footer.review}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>© {copyrightYears()} {COMPANY.brand}. {t.footer.rights}</span>
          <a href={SITE_CONFIG.afDigitalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{t.footer.credit} AfDigital — Soluções Tecnológicas</a>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ label, h1, lead, img }: { label: string; h1: string; lead: string; img?: string }) {
  const lang = useLang();
  const homeLabel = DICT[lang].nav.home;
  return (
    <section data-header-overlay className="relative overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground md:pb-28 md:pt-44">
      {img && <><img src={img} alt="" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="absolute inset-0 shade-hero" /></>}
      <div className="container-x relative animate-rise">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-ink-muted">
          <a href={`/${lang}`} className="hover:text-sky">{homeLabel}</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <p className="eyebrow text-sky">{label}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{h1}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">{lead}</p>
      </div>
    </section>
  );
}

export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <div key={f.q}>
          <button id={`faq-button-${i}`} className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold" aria-expanded={open === i} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            {f.q}{open === i ? <Minus aria-hidden="true" className="shrink-0 text-primary" /> : <Plus aria-hidden="true" className="shrink-0 text-primary" />}
          </button>
          {open === i && <p id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className="pb-6 pr-10 text-muted-foreground">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function CtaBand() {
  const lang = useLang();
  const t = DICT[lang];
  return (
    <section className="bg-primary">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">{t.home.ctaTitle}</h2>
          <p className="mt-3 max-w-xl text-primary-foreground/80">{t.home.ctaText}</p>
        </div>
        <a href={pageHref(lang, "contact")} className="btn bg-ink text-ink-foreground hover:bg-ink/85">{t.nav.quote} <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setV(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${className} transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${v ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>{children}</div>;
}
