import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { DICT, PAGE_SLUGS, SERVICE_IDS, isLang, seoHead, serviceFromSlug, servicePaths, type Lang, type ServiceId } from "@/i18n/content";
import { Faqs, PageHero, pageHref, serviceHref } from "@/components/site";
import { EXTRA_CONTENT, articleBySlug, articlePaths } from "@/i18n/extended-content";
import s2 from "@/assets/stage-2.jpg";
import s3 from "@/assets/stage-3.jpg";
import s4 from "@/assets/stage-4.jpg";

const IMG: Record<ServiceId, string> = {
  buildings: s4, lsf: s2, renovations: s4, painting: s3, coverings: s2,
  plastering: s2, glazing: s3, roofing: s4, etics: s3,
};

export const Route = createFileRoute("/$lang/$page/$service")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
    const isService = params.page === PAGE_SLUGS[params.lang].services && serviceFromSlug(params.lang, params.service);
    const isArticle = params.page === PAGE_SLUGS[params.lang].blog && articleBySlug(params.lang, params.service);
    if (!isService && !isArticle) throw notFound();
  },
  head: ({ params }) => {
    const l = (isLang(params.lang) ? params.lang : "pt") as Lang;
    if (params.page === PAGE_SLUGS[l].blog) {
      const article = articleBySlug(l, params.service);
      const index = EXTRA_CONTENT[l].blog.articles.findIndex((item) => item.slug === params.service);
      if (article && index >= 0) return seoHead(l, `${article.title} — JGM Construções`, article.description, articlePaths(index));
    }
    const s = serviceFromSlug(l, params.service) ?? "lsf";
    return seoHead(l, DICT[l].services[s].title, DICT[l].services[s].metaDesc, servicePaths(s));
  },
  component: Detail,
});

function Detail() {
  const p = Route.useParams();
  const lang = p.lang as Lang;
  if (p.page === PAGE_SLUGS[lang].blog) return <Article lang={lang} slug={p.service} />;
  return <Service lang={lang} slug={p.service} />;
}

function Article({ lang, slug }: { lang: Lang; slug: string }) {
  const article = articleBySlug(lang, slug)!;
  const t = EXTRA_CONTENT[lang];
  return (<>
    <PageHero label={article.category} h1={article.title} lead={article.description} img={s2} />
    <article className="container-x max-w-3xl space-y-10 py-24">
      {article.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">{paragraph}</p>)}
        </section>
      ))}
      <a href={pageHref(lang, "blog")} className="btn btn-outline">{t.blog.back}</a>
    </article>
  </>);
}

function Service({ lang, slug }: { lang: Lang; slug: string }) {
  const id = serviceFromSlug(lang, slug)!;
  const t = DICT[lang];
  const s = t.services[id];
  const L = t.service;
  return (<>
    <PageHero label={t.nav.services} h1={s.name} lead={s.short} img={IMG[id]} />
    <section className="container-x grid gap-12 py-24 md:grid-cols-2">
      <p className="text-lg leading-relaxed">{s.intro}</p>
      <figure><img src={IMG[id]} alt={`${s.name} — ${L.illustrative}`} width={1600} height={912} className="aspect-[4/3] w-full rounded-sm object-cover" /><figcaption className="mt-2 text-xs text-muted-foreground">{L.illustrative}</figcaption></figure>
    </section>
    <section className="bg-card py-24">
      <div className="container-x grid gap-12 md:grid-cols-2">
        <div><h2 className="text-2xl font-bold">{L.problems}</h2><ul className="mt-6 space-y-3">{s.problems.map((x) => <li key={x} className="border-l-2 border-sky pl-4">{x}</li>)}</ul></div>
        <div><h2 className="text-2xl font-bold">{L.benefits}</h2><ul className="mt-6 space-y-3">{s.benefits.map((x) => <li key={x} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-primary" size={20} />{x}</li>)}</ul></div>
      </div>
    </section>
    <section className="bg-ink py-24 text-ink-foreground">
      <div className="container-x"><h2 className="text-3xl font-bold">{L.process}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">{s.steps.map((x, i) => <li key={x.t} className="border-t border-ink-foreground/20 pt-6"><span className="font-display text-3xl font-bold text-primary">0{i + 1}</span><h3 className="mt-2 text-lg font-semibold">{x.t}</h3><p className="mt-2 text-sm text-ink-muted">{x.d}</p></li>)}</ol>
      </div>
    </section>
    <section className="container-x grid gap-10 py-24 md:grid-cols-3">
      <h2 className="text-3xl font-bold">{L.faq}</h2>
      <div className="md:col-span-2"><Faqs items={s.faqs} /></div>
    </section>
    <section className="container-x pb-24">
      <h2 className="eyebrow text-primary">{L.related}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {SERVICE_IDS.filter((x) => x !== id).map((x) => <a key={x} href={serviceHref(lang, x)} className="group flex items-center justify-between rounded-sm border border-border p-6 hover:border-primary"><span className="font-display text-lg font-semibold">{t.services[x].name}</span><ArrowRight className="text-primary transition-transform group-hover:translate-x-1" /></a>)}
      </div>
      <div className="mt-16 rounded-sm bg-primary p-10"><p className="text-xl font-semibold text-primary-foreground">{L.ctaText}</p><a href={pageHref(lang, "contact")} className="btn mt-6 bg-ink text-ink-foreground hover:bg-ink/85">{L.cta}</a></div>
    </section>
  </>);
}
