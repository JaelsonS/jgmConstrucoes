import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { DICT, SERVICE_IDS, homePaths, seoHead, type Lang, type ServiceId } from "@/i18n/content";
import { CtaBand, Faqs, Reveal, pageHref, serviceHref } from "@/components/site";
import { StageImage } from "@/components/photo";
import { STAGES } from "@/lib/photos";

const HERO_SIZES = "100vw";
const CARD_SIZES = "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw";
const SVC_STAGE: Record<ServiceId, 0 | 1 | 2 | 3> = {
  buildings: 3,
  lsf: 1,
  renovations: 3,
  painting: 2,
  coverings: 0,
  plastering: 1,
  glazing: 2,
  roofing: 0,
  etics: 2,
};

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const l = params.lang as Lang;
    const t = DICT[l] ?? DICT.pt;
    return seoHead(l, t.home.metaTitle, t.home.metaDesc, homePaths());
  },
  component: Home,
});

type StoryListener = (progress: number, reducedMotion: boolean) => void;

function stageVisual(progress: number, index: number, reducedMotion: boolean): CSSProperties {
  const frame = progress * (STAGES.length - 1);
  const local = frame - index;
  const scale = 1.12 - Math.min(1, Math.max(0, local + 1)) * 0.06;
  return {
    opacity: Math.max(0, 1 - Math.abs(frame - index)),
    transform: reducedMotion ? "none" : `scale(${scale}) translateY(${local * -2}%)`,
  };
}

/** Progress within the cinematic story, 0 → 1. Layout is measured outside the scroll frame. */
function useStoryProgress(storyRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef(0);
  const reducedRef = useRef(false);
  const listeners = useRef(new Set<StoryListener>());
  const [stage, setStage] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  const subscribe = useCallback((listener: StoryListener) => {
    listeners.current.add(listener);
    listener(progressRef.current, reducedRef.current);
    return () => listeners.current.delete(listener);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const metrics = { start: 0, height: 1, viewport: 1 };
    let frame = 0;
    const measure = () => {
      const story = storyRef.current;
      metrics.viewport = window.innerHeight;
      if (!story) return;
      metrics.start = story.offsetTop;
      metrics.height = story.offsetHeight;
    };
    const apply = () => {
      const reducedMotion = media.matches;
      reducedRef.current = reducedMotion;
      const max = Math.max(1, metrics.height - metrics.viewport);
      const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (window.scrollY - metrics.start) / max));
      progressRef.current = progress;
      const top = metrics.start - window.scrollY;
      const nextVisible = top < metrics.viewport && top + metrics.height > 0;
      const nextStage = Math.min(3, Math.round(progress * 3));
      setReduced((current) => (current === reducedMotion ? current : reducedMotion));
      setVisible((current) => (current === nextVisible ? current : nextVisible));
      setStage((current) => (current === nextStage ? current : nextStage));
      listeners.current.forEach((listener) => listener(progress, reducedMotion));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    measure();
    apply();
    const observer = new ResizeObserver(() => {
      measure();
      apply();
    });
    if (storyRef.current) observer.observe(storyRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onScroll);
    };
  }, [storyRef]);

  return { subscribe, stage, reduced, visible };
}

/** Fixed background: the house is built step by step within the story only */
function BuildBackdrop({
  lang,
  subscribe,
  visible,
  reduced,
}: {
  lang: Lang;
  subscribe: (listener: StoryListener) => () => void;
  visible: boolean;
  reduced: boolean;
}) {
  const stages = DICT[lang].home.stages;
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => subscribe((progress, reducedMotion) => {
    const frame = progress * (STAGES.length - 1);
    const needed = reducedMotion ? STAGES.length : Math.min(STAGES.length, Math.max(1, Math.ceil(frame + 1)));
    setCount((current) => (current >= needed ? current : needed));
    images.current.forEach((img, index) => {
      if (!img) return;
      const visual = stageVisual(progress, index, reducedMotion);
      img.style.opacity = String(visual.opacity ?? 0);
      img.style.transform = String(visual.transform ?? "none");
    });
    if (labelRef.current) {
      const index = Math.min(STAGES.length - 1, Math.round(frame));
      labelRef.current.textContent = `${stages[index]?.t ?? ""} · ${Math.round(progress * 100)}%`;
    }
  }), [subscribe, stages]);

  useEffect(() => {
    const next = STAGES[1];
    const warm = window.setTimeout(() => {
      const image = new Image();
      image.sizes = HERO_SIZES;
      image.srcset = next.avif;
    }, 2000);
    return () => window.clearTimeout(warm);
  }, []);

  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div aria-hidden="true">
        {STAGES.slice(0, count).map((photo, index) => (
          <StageImage
            key={photo.src}
            photo={photo}
            alt=""
            sizes={HERO_SIZES}
            priority={index === 0}
            {...(index === 0 ? { fetchPriority: "low" as const } : {})}
            className="absolute inset-0"
            imgClassName="h-full w-full object-cover"
            imgRef={(node) => { images.current[index] = node; }}
            style={stageVisual(reduced ? 1 : 0, index, reduced)}
          />
        ))}
        <div className="absolute inset-0 shade-hero" />
      </div>
      <div ref={labelRef} aria-hidden="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-foreground backdrop-blur">
        {stages[0]?.t} · 0%
      </div>
    </div>
  );
}

function BuildSequence({ lang, stage }: { lang: Lang; stage: number }) {
  const t = DICT[lang].home;
  return (
    <section className="py-24 text-ink-foreground md:py-32">
      <div className="container-x grid gap-10 md:grid-cols-2">
        <div className="rounded-sm bg-ink/90 p-8">
          <p className="eyebrow text-sky">{t.buildLabel}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.buildTitle}</h2>
          <p className="mt-6 text-sm text-ink-muted">{t.buildNote}</p>
        </div>
        <ol className="space-y-3 rounded-sm bg-ink/90 p-8">
          {t.stages.map((s, k) => (
            <li key={s.t} className={`border-l-2 pl-5 transition-all duration-500 ${k === stage ? "border-primary" : k < stage ? "border-sky" : "border-ink-foreground/25"}`}>
              <span className="font-display text-sm font-semibold text-primary">0{k + 1}</span>
              <h3 className="text-xl font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Home() {
  const { lang: l } = Route.useParams();
  const lang = l as Lang;
  const d = DICT[lang];
  const t = d.home;
  const completion = t.completion;
  const storyRef = useRef<HTMLDivElement>(null);
  const { subscribe, stage, reduced, visible } = useStoryProgress(storyRef);
  return (
    <div className="relative isolate">
      <div ref={storyRef}>
      <BuildBackdrop lang={lang} subscribe={subscribe} visible={visible} reduced={reduced} />

      <section data-header-overlay className="relative flex min-h-screen items-end pb-20 text-ink-foreground">
        <div className="container-x relative animate-rise">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-sky md:text-base">{t.brand}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-ink-muted md:text-sm">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] md:text-7xl">{t.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground">{t.sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={pageHref(lang, "contact")} className="btn btn-primary">{t.cta1} <ArrowRight aria-hidden="true" size={18} /></a>
            <a href={pageHref(lang, "services")} className="btn btn-ghost-light">{t.cta2}</a>
          </div>
          <a href="#intro" className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-foreground"><ArrowDown aria-hidden="true" size={14} /> {t.scroll}</a>
        </div>
      </section>

      <section id="intro" className="bg-background/95">
        <div className="container-x grid gap-10 py-24 md:grid-cols-2 md:py-32">
          <Reveal><p className="eyebrow text-primary-text">{t.introLabel}</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.introTitle}</h2></Reveal>
          <Reveal><p className="text-lg leading-relaxed text-foreground/85">{t.introText}</p></Reveal>
        </div>
      </section>

      <div className="h-[45vh]" aria-hidden />

      <section className="bg-card/95 py-24">
        <div className="container-x">
          <p className="eyebrow text-primary-text">{t.servicesLabel}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-5xl">{t.servicesTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_IDS.map((s) => (
              <Reveal key={s} className="h-full">
                <a href={serviceHref(lang, s)} className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-background">
                  <div className="aspect-[4/3] overflow-hidden">
                    <StageImage photo={STAGES[SVC_STAGE[s]]} alt={d.illustrative} sizes={CARD_SIZES} imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold md:min-h-14">{d.services[s].name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.services[s].short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary-text">{t.more} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BuildSequence lang={lang} stage={stage} />

      <section className="bg-background/95">
        <div className="container-x py-24 md:py-32">
          <p className="eyebrow text-primary-text">{t.processLabel}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-5xl">{t.processTitle}</h2>
          <ol className="mt-14 grid gap-8 md:grid-cols-4">
            {t.process.map((p, k) => (
              <li key={p.t} className="list-none">
                <Reveal>
                  <div className="border-t-2 border-foreground pt-6">
                    <span className="font-display text-4xl font-bold text-steel-text">0{k + 1}</span>
                    <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-[45vh]" aria-hidden />

      <section className="bg-ink/90 py-24 text-ink-foreground">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div><p className="eyebrow text-sky">{t.portfolioLabel}</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.portfolioTitle}</h2><p className="mt-6 text-ink-muted">{t.portfolioText}</p></div>
          <div className="grid grid-cols-2 gap-3">{STAGES.map((photo) => <StageImage key={photo.src} photo={photo} alt={d.illustrative} sizes="(min-width: 768px) 22vw, 45vw" imgClassName="aspect-square w-full rounded-sm object-cover" />)}</div>
        </div>
      </section>
      </div>

      <section className="bg-card">
        <div className="container-x grid gap-10 py-24 md:grid-cols-3">
          <div><p className="eyebrow text-primary-text">{t.faqLabel}</p><h2 className="mt-4 text-3xl font-bold">{t.faqTitle}</h2><a href={pageHref(lang, "faq")} className="btn btn-outline mt-8">{t.allFaq}</a></div>
          <div className="md:col-span-2"><Faqs items={d.faqs.slice(0, 4)} /></div>
        </div>
      </section>
      <CtaBand />

      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink py-16 text-ink-foreground md:min-h-[85vh] md:py-24">
        <StageImage photo={STAGES[3]} alt={d.illustrative} sizes="100vw" className="absolute inset-0" imgClassName="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="container-x relative">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">{completion.label} · 100%</p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">{completion.title}</h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-muted">{completion.text}</p>
            <ol className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.stages.map((item, index) => (
                <li key={item.t} className="flex gap-3 border-t border-white/20 pt-3">
                  <span className="font-display font-bold text-primary">0{index + 1}</span>
                  <span>
                    <strong className="block">{item.t}</strong>
                    <span className="text-sm text-ink-muted">{item.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs text-ink-muted">{t.buildNote}</p>
            <a href={pageHref(lang, "contact")} className="btn btn-primary mt-7">{completion.cta}<ArrowRight aria-hidden="true" size={18} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
