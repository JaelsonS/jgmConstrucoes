import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { DICT, SERVICE_IDS, homePaths, seoHead, type Lang, type ServiceId } from "@/i18n/content";
import { CtaBand, Faqs, Reveal, pageHref, serviceHref } from "@/components/site";
import s1 from "@/assets/stage-1.jpg";
import s2 from "@/assets/stage-2.jpg";
import s3 from "@/assets/stage-3.jpg";
import s4 from "@/assets/stage-4.jpg";

const STAGES = [s1, s2, s3, s4];
const SVC_IMG: Record<ServiceId, string> = {
  buildings: s4,
  lsf: s2,
  renovations: s4,
  painting: s3,
  coverings: s1,
  plastering: s2,
  glazing: s3,
  roofing: s1,
  etics: s3,
};

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const l = params.lang as Lang;
    const t = DICT[l] ?? DICT.pt;
    return seoHead(l, t.home.metaTitle, t.home.metaDesc, homePaths());
  },
  component: Home,
});

/** Progress within the cinematic story, 0 → 1. */
function useStoryProgress(storyRef: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    let raf = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const story = storyRef.current;
        if (!story) return;
        const start = story.offsetTop;
        const max = Math.max(1, story.offsetHeight - window.innerHeight);
        setP(Math.min(1, Math.max(0, (window.scrollY - start) / max)));
      });
    };
    const motion = () => setReducedMotion(media.matches);
    motion();
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    media.addEventListener("change", motion);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
      media.removeEventListener("change", motion);
    };
  }, [storyRef]);
  return { progress: reducedMotion ? 1 : p, reducedMotion };
}

/** Fixed background: the house is built step by step within the story only */
function BuildBackdrop({ progress, lang, reducedMotion, storyRef }: { progress: number; lang: Lang; reducedMotion: boolean; storyRef: RefObject<HTMLElement | null> }) {
  const d = DICT[lang];
  const f = progress * (STAGES.length - 1);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const update = () => {
      const rect = story.getBoundingClientRect();
      setVisible(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [storyRef]);
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div aria-hidden="true">
        {STAGES.map((src, k) => {
        const o = Math.max(0, 1 - Math.abs(f - k));
        const local = f - k; // -1..1 around this stage
        return (
          <img key={k} src={src} alt="" width={1600} height={912} loading={k === 0 ? "eager" : "lazy"} fetchPriority={k === 0 ? "high" : "low"}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              opacity: o,
              transform: reducedMotion
                ? "none"
                : `scale(${1.12 - Math.min(1, Math.max(0, local + 1)) * 0.06}) translateY(${local * -2}%)`,
            }} />
        );
      })}
        <div className="absolute inset-0 shade-hero" />
      </div>
      <div aria-hidden="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-foreground backdrop-blur">
        {d.home.stages[Math.min(3, Math.round(f))]?.t} · {Math.round(progress * 100)}%
      </div>
    </div>
  );
}

function BuildSequence({ lang, progress }: { lang: Lang; progress: number }) {
  const t = DICT[lang].home;
  const i = Math.min(3, Math.round(progress * 3));
  return (
    <section className="py-24 text-ink-foreground md:py-32">
      <div className="container-x grid gap-10 md:grid-cols-2">
        <div className="rounded-sm bg-ink/80 p-8 backdrop-blur-md">
          <p className="eyebrow text-sky">{t.buildLabel}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.buildTitle}</h2>
          <p className="mt-6 text-sm text-ink-muted">{t.buildNote}</p>
        </div>
        <ol className="space-y-3 rounded-sm bg-ink/80 p-8 backdrop-blur-md">
          {t.stages.map((s, k) => (
            <li key={s.t} className={`border-l-2 pl-5 transition-all duration-500 ${k === i ? "border-primary" : k < i ? "border-sky" : "border-ink-foreground/25"}`}>
              <span className="font-display text-sm text-primary">0{k + 1}</span>
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
  const completion = {
    pt: { label: "Obra concluída", title: "Do primeiro movimento de terra ao último acabamento.", text: "A sequência termina com o edifício completo. Cada fase depende da anterior e é acompanhada com planeamento, comunicação e atenção aos detalhes.", cta: "Falar sobre o meu projeto" },
    en: { label: "Completed build", title: "From the first groundworks to the final finish.", text: "The sequence ends with the completed building. Every stage builds on the previous one and is followed with planning, communication and attention to detail.", cta: "Discuss my project" },
    es: { label: "Obra terminada", title: "Del primer movimiento de tierra al último acabado.", text: "La secuencia termina con el edificio completo. Cada fase depende de la anterior y se acompaña con planificación, comunicación y atención al detalle.", cta: "Hablar de mi proyecto" },
  }[lang];
  const storyRef = useRef<HTMLDivElement>(null);
  const { progress, reducedMotion } = useStoryProgress(storyRef);
  return (
    <div className="relative isolate">
      <div ref={storyRef}>
      <BuildBackdrop progress={progress} lang={lang} reducedMotion={reducedMotion} storyRef={storyRef} />

      <section data-header-overlay className="relative flex min-h-screen items-end pb-20 text-ink-foreground">
        <div className="container-x relative animate-rise">
          <p className="eyebrow text-sky">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] md:text-7xl">{t.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground">{t.sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={pageHref(lang, "contact")} className="btn btn-primary">{t.cta1} <ArrowRight size={18} /></a>
            <a href={pageHref(lang, "services")} className="btn btn-ghost-light">{t.cta2}</a>
          </div>
          <a href="#intro" className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-foreground"><ArrowDown size={14} /> {t.scroll}</a>
        </div>
      </section>

      <section id="intro" className="bg-background/95 backdrop-blur-sm">
        <div className="container-x grid gap-10 py-24 md:grid-cols-2 md:py-32">
          <Reveal><p className="eyebrow text-primary">{t.introLabel}</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.introTitle}</h2></Reveal>
          <Reveal><p className="text-lg leading-relaxed text-foreground/85">{t.introText}</p></Reveal>
        </div>
      </section>

      <div className="h-[45vh]" aria-hidden />

      <section className="bg-card/95 py-24 backdrop-blur-sm">
        <div className="container-x">
          <p className="eyebrow text-primary">{t.servicesLabel}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-5xl">{t.servicesTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_IDS.map((s) => (
              <Reveal key={s} className="h-full">
                <a href={serviceHref(lang, s)} className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-background">
                  <div className="aspect-[4/3] overflow-hidden"><img src={SVC_IMG[s]} alt={d.illustrative} width={1600} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold md:min-h-14">{d.services[s].name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.services[s].short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary">{t.more} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BuildSequence lang={lang} progress={progress} />

      <section className="bg-background/95 backdrop-blur-sm">
        <div className="container-x py-24 md:py-32">
          <p className="eyebrow text-primary">{t.processLabel}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-5xl">{t.processTitle}</h2>
          <ol className="mt-14 grid gap-8 md:grid-cols-4">
            {t.process.map((p, k) => (
              <Reveal key={p.t}><li className="list-none border-t-2 border-foreground pt-6">
                <span className="font-display text-4xl font-bold text-steel">0{k + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </li></Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-[45vh]" aria-hidden />

      <section className="bg-ink/90 py-24 text-ink-foreground backdrop-blur-md">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div><p className="eyebrow text-sky">{t.portfolioLabel}</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.portfolioTitle}</h2><p className="mt-6 text-ink-muted">{t.portfolioText}</p></div>
          <div className="grid grid-cols-2 gap-3">{STAGES.map((x, k) => <img key={k} src={x} alt={d.illustrative} width={1600} height={912} loading="lazy" className="aspect-square w-full rounded-sm object-cover" />)}</div>
        </div>
      </section>
      </div>

      <section className="bg-card">
        <div className="container-x grid gap-10 py-24 md:grid-cols-3">
          <div><p className="eyebrow text-primary">{t.faqLabel}</p><h2 className="mt-4 text-3xl font-bold">{t.faqTitle}</h2><a href={pageHref(lang, "faq")} className="btn btn-outline mt-8">{t.allFaq}</a></div>
          <div className="md:col-span-2"><Faqs items={d.faqs.slice(0, 4)} /></div>
        </div>
      </section>
      <CtaBand />

      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink py-16 text-ink-foreground md:min-h-[85vh] md:py-24">
        <img src={s4} alt={d.illustrative} width={1600} height={912} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="container-x relative">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">{completion.label} · 100%</p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">{completion.title}</h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-muted">{completion.text}</p>
            <ol className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.stages.map((stage, index) => (
                <li key={stage.t} className="flex gap-3 border-t border-white/20 pt-3">
                  <span className="font-display font-bold text-primary">0{index + 1}</span>
                  <span>
                    <strong className="block">{stage.t}</strong>
                    <span className="text-sm text-ink-muted">{stage.d}</span>
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
