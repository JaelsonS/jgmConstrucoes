import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, MapPin, Building2, FileLock2, LoaderCircle, MessageCircle } from "lucide-react";
import { COMPANY, DICT, SERVICE_IDS, isLang, pageKeyFromSlug, pagePaths, seoHead, type Lang, type PageKey, type ServiceId } from "@/i18n/content";
import { CtaBand, Faqs, PageHero, Reveal, pageHref, serviceHref } from "@/components/site";
import { StageImage } from "@/components/photo";
import { EXTRA_CONTENT } from "@/i18n/extended-content";
import { useConsent } from "@/components/consent";
import { PhoneInput, validatePhoneField } from "@/components/phone-input";
import { CONTACT_SERVICES } from "@/lib/contact-schema";
import { sendContactRequest } from "@/lib/contact.server";
import { sendCareerInterest } from "@/lib/career.server";
import { STAGES, type StagePhoto } from "@/lib/photos";
import { ASSISTANT_CONTENT } from "@/i18n/assistant-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CONTACTS } from "@/config/contacts";

function phoneFieldCopy(lang: Lang) {
  const f = DICT[lang].contact.form;
  return {
    country: f.phoneCountry,
    search: f.phoneSearch,
    searchPlaceholder: f.phoneSearchPlaceholder,
    number: f.phoneNumber,
    invalid: f.phoneInvalid,
    noResults: f.phoneNoResults,
  };
}

const SERVICE_PAGE_IMG: Record<ServiceId, StagePhoto> = {
  buildings: STAGES[3], lsf: STAGES[1], renovations: STAGES[3], painting: STAGES[2], coverings: STAGES[0],
  plastering: STAGES[1], glazing: STAGES[2], roofing: STAGES[0], etics: STAGES[2],
};

export const Route = createFileRoute("/$lang/$page/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang) || !pageKeyFromSlug(params.lang, params.page)) throw notFound();
  },
  head: ({ params }) => {
    const l = (isLang(params.lang) ? params.lang : "pt") as Lang;
    const k = pageKeyFromSlug(l, params.page) ?? "about";
    const t = DICT[l];
    const standard = { about: t.about, services: t.servicesPage, contact: t.contact, faq: t.faqPage } as const;
    const m = k in standard
      ? standard[k as keyof typeof standard]
      : EXTRA_CONTENT[l].pages[k as Exclude<PageKey, keyof typeof standard>];
    return seoHead(l, m.metaTitle, m.metaDesc, pagePaths(k));
  },
  component: Page,
});

function Page() {
  const { lang: l, page } = Route.useParams();
  const lang = l as Lang;
  const k = pageKeyFromSlug(lang, page)!;
  const t = DICT[lang];

  if (k === "about")
    return (<>
      <PageHero label={t.about.label} h1={t.about.h1} lead={t.about.lead} photo={STAGES[1]} />
      <section className="container-x grid gap-8 py-24 sm:grid-cols-2 lg:grid-cols-4">
        {t.about.blocks.map((b, i) => (
          <Reveal key={b.t}><span className="font-display text-4xl font-bold text-sky-text">0{i + 1}</span><h2 className="mt-3 text-2xl font-semibold">{b.t}</h2><p className="mt-3 text-muted-foreground">{b.d}</p></Reveal>
        ))}
      </section>
      <CtaBand />
    </>);

  if (k === "services")
    return (<>
      <PageHero label={t.servicesPage.label} h1={t.servicesPage.h1} lead={t.servicesPage.lead} photo={STAGES[2]} />
      <section className="container-x space-y-20 py-24">
        {SERVICE_IDS.map((s, i) => (
          <Reveal key={s} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <StageImage photo={SERVICE_PAGE_IMG[s]} alt={t.illustrative} sizes="(min-width: 768px) 46vw, 92vw" imgClassName="aspect-[4/3] w-full rounded-sm object-cover" />
            <div>
              <h2 className="text-3xl font-bold">{t.services[s].name}</h2>
              <p className="mt-4 text-muted-foreground">{t.services[s].intro}</p>
              <a href={serviceHref(lang, s)} className="btn btn-outline mt-8">{t.home.more} <ArrowRight size={16} /></a>
            </div>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>);

  if (k === "faq")
    return (<>
      <PageHero label={t.faqPage.label} h1={t.faqPage.h1} lead={t.faqPage.lead} photo={STAGES[0]} />
      <section className="container-x max-w-4xl py-24"><Faqs items={[...t.faqs, ...SERVICE_IDS.flatMap((s) => t.services[s].faqs)]} /></section>
      <CtaBand />
    </>);

  if (k === "blog") {
    const extra = EXTRA_CONTENT[lang];
    return (<>
      <PageHero label={extra.pages.blog.label} h1={extra.pages.blog.title} lead={extra.pages.blog.lead} photo={STAGES[0]} />
      <section className="container-x grid gap-6 py-24 md:grid-cols-3">
        {extra.blog.articles.map((article) => (
          <article key={article.slug} className="flex flex-col rounded-sm border border-border bg-card p-6">
            <p className="eyebrow text-primary-text">{article.category}</p>
            <h2 className="mt-4 text-2xl font-semibold">{article.title}</h2>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">{article.description}</p>
            <a href={`${pageHref(lang, "blog")}/${article.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-text">{extra.blog.read}<ArrowRight aria-hidden="true" size={16} /></a>
          </article>
        ))}
      </section>
    </>);
  }

  if (k === "careers") {
    const extra = EXTRA_CONTENT[lang];
    return (<>
      <PageHero label={extra.pages.careers.label} h1={extra.pages.careers.title} lead={extra.pages.careers.lead} photo={STAGES[2]} />
      <section className="container-x py-24">
        <div className="mx-auto max-w-3xl rounded-sm border border-border bg-card p-8 md:p-12">
          <FileLock2 aria-hidden="true" className="text-primary-text" size={36} />
          <h2 className="mt-5 text-2xl font-semibold">{extra.careers.notice}</h2>
          <p className="mt-4 text-muted-foreground">{extra.careers.noUpload}</p>
          <p className="mt-4 text-muted-foreground">{extra.careers.voluntary}</p>
          <CareerForm lang={lang} />
        </div>
      </section>
    </>);
  }

  if (k === "privacy" || k === "cookies" || k === "terms") {
    const extra = EXTRA_CONTENT[lang];
    const page = extra.pages[k];
    const sections = extra.legal[k];
    return (<>
      <PageHero label={page.label} h1={page.title} lead={page.lead} />
      <article className="container-x max-w-4xl space-y-10 py-24">
        {sections.map((section) => <section key={section.title}><h2 className="text-2xl font-semibold">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">{paragraph}</p>)}</section>)}
        <p className="rounded-sm border border-primary/30 bg-primary/5 p-5 text-sm">{extra.legal.reviewRequired}</p>
      </article>
    </>);
  }

  return <Contact lang={lang} />;
}

function CareerForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const copy = EXTRA_CONTENT[lang].careers.form;
  const field = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const result = await sendCareerInterest({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          area: String(data.get("area") ?? ""),
          message: String(data.get("message") ?? ""),
          language: lang,
          website: String(data.get("website") ?? ""),
          submissionId,
        },
      });
      if (!result.accepted) throw new Error("NOT_ACCEPTED");
      form.reset();
      setSubmissionId(crypto.randomUUID());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <form onSubmit={submit} className="mt-10 grid gap-5 md:grid-cols-2">
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="text-sm font-semibold">{copy.name} *<input required name="name" autoComplete="name" maxLength={120} className={field} /></label>
      <label className="text-sm font-semibold">{copy.email} *<input required name="email" type="email" autoComplete="email" maxLength={254} className={field} /></label>
      <PhoneInput
        key={submissionId}
        lang={lang}
        copy={phoneFieldCopy(lang)}
        label={copy.phone}
        className="text-sm font-semibold"
      />
      <label className="text-sm font-semibold">{copy.area} *<input required name="area" maxLength={120} className={field} /></label>
      <label className="text-sm font-semibold md:col-span-2">{copy.message}<textarea name="message" rows={4} maxLength={1500} className={field} /></label>
      <label className="flex items-start gap-3 text-sm md:col-span-2"><input required type="checkbox" className="mt-1 h-4 w-4 accent-primary" /><span>{copy.consent} <a href={pageHref(lang, "privacy")} className="underline">{DICT[lang].footer.privacy}</a></span></label>
      <div className="md:col-span-2">
        <button disabled={status === "sending"} className="btn btn-primary">{status === "sending" && <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />}{copy.submit}</button>
        {status === "success" && <p role="status" className="mt-4 text-sm">{copy.success}</p>}
        {status === "error" && <p role="alert" className="mt-4 text-sm text-destructive">{copy.error}</p>}
      </div>
    </form>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const f = t.contact.form;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const { preferences, allowExternal } = useConsent();
  const messages = { sending: f.sending, success: f.success, error: f.error };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const er: Record<string, string> = {};
    for (const n of ["name", "email", "service", "message"]) if (!String(d.get(n) ?? "").trim()) er[n] = f.required;
    if (!er["email"] && !/^\S+@\S+\.\S+$/.test(String(d.get("email")))) er["email"] = f.invalidEmail;
    const phoneError = validatePhoneField(String(d.get("phone") ?? ""), f.phoneInvalid);
    if (phoneError) er["phone"] = phoneError;
    setErrors(er);
    if (Object.keys(er).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("sending");
    try {
      const result = await sendContactRequest({
        data: {
          name: String(d.get("name")),
          email: String(d.get("email")),
          phone: String(d.get("phone") ?? ""),
          service: String(d.get("service")) as (typeof CONTACT_SERVICES)[number],
          location: String(d.get("location") ?? ""),
          message: String(d.get("message")),
          language: lang,
          website: String(d.get("website") ?? ""),
          submissionId,
        },
      });
      if (!result.accepted) throw new Error("NOT_ACCEPTED");
      setStatus("success");
      form.reset();
      setSubmissionId(crypto.randomUUID());
    } catch {
      setStatus("error");
    }
  };
  const field = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  const fieldError = (n: string) =>
    errors[n] ? <p id={`${n}-err`} className="mt-1 text-sm text-destructive">{errors[n]}</p> : null;
  return (<>
    <PageHero label={t.contact.label} h1={t.contact.h1} lead={t.contact.lead} photo={STAGES[3]} />
    <section className="container-x grid gap-14 py-24 md:grid-cols-3">
      <form onSubmit={submit} noValidate className="grid gap-6 md:col-span-2 md:grid-cols-2">
        <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="text-sm font-semibold">{f.name} *<input name="name" autoComplete="name" maxLength={120} className={field} aria-invalid={!!errors["name"]} aria-describedby={errors["name"] ? "name-err" : undefined} />{fieldError("name")}</label>
        <label className="text-sm font-semibold">{f.email} *<input name="email" type="email" autoComplete="email" maxLength={254} className={field} aria-invalid={!!errors["email"]} aria-describedby={errors["email"] ? "email-err" : undefined} />{fieldError("email")}</label>
        <PhoneInput
          key={submissionId}
          lang={lang}
          copy={phoneFieldCopy(lang)}
          label={f.phone}
          optionalHint={`(${f.optional})`}
          className="text-sm font-semibold"
          error={errors["phone"]}
        />
        <label className="text-sm font-semibold">{f.service} *
          <select name="service" defaultValue="" className={field} aria-invalid={!!errors["service"]} aria-describedby={errors["service"] ? "service-err" : undefined}>
            <option value="" disabled>{f.choose}</option>
            {SERVICE_IDS.map((s) => <option key={s} value={s}>{t.services[s].name}</option>)}
            <option value="other">{f.other}</option>
          </select>{fieldError("service")}
        </label>
        <label className="text-sm font-semibold md:col-span-2">{f.location} <span className="font-normal text-muted-foreground">({f.optional})</span><input name="location" maxLength={160} className={field} /></label>
        <label className="text-sm font-semibold md:col-span-2">{f.message} *<textarea name="message" rows={6} maxLength={3000} className={field} aria-invalid={!!errors["message"]} aria-describedby={errors["message"] ? "message-err" : undefined} />{fieldError("message")}</label>
        <p className="text-xs text-muted-foreground md:col-span-2">{f.privacy} <a className="underline hover:text-primary" href={pageHref(lang, "privacy")}>{DICT[lang].footer.privacy}</a></p>
        <div className="md:col-span-2">
          <button className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? <LoaderCircle aria-hidden="true" size={18} className="animate-spin" /> : <ArrowRight aria-hidden="true" size={18} />}{status === "sending" ? messages.sending : f.submit}</button>
          {status === "success" && <p role="status" className="mt-4 rounded-sm bg-card p-4 text-sm">{messages.success}</p>}
          {status === "error" && <p role="alert" className="mt-4 rounded-sm bg-destructive/10 p-4 text-sm text-destructive">{messages.error}</p>}
        </div>
      </form>
      <aside className="space-y-8">
        <div><h2 className="flex items-center gap-2 font-display font-semibold"><MapPin aria-hidden="true" size={18} className="text-primary-text" />{t.contact.address}</h2><address className="mt-3 not-italic text-muted-foreground">{COMPANY.address.map((a) => <span key={a}>{a}<br /></span>)}</address></div>
        <div>
          <h2 className="flex items-center gap-2 font-display font-semibold">
            <MessageCircle aria-hidden="true" size={18} className="text-primary-text" />
            {t.contact.whatsapp}
          </h2>
          <p className="mt-3 text-muted-foreground">{CONTACTS.whatsappDisplay}</p>
          <a
            href={buildWhatsAppUrl(ASSISTANT_CONTENT[lang].whatsapp.direct) ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-4"
          >
            {t.contact.whatsappCta}
          </a>
        </div>
        <div><h2 className="flex items-center gap-2 font-display font-semibold"><Building2 aria-hidden="true" size={18} className="text-primary-text" />{t.contact.legal}</h2><p className="mt-3 text-muted-foreground">{COMPANY.legal}<br />NIF {COMPANY.nif}</p></div>
        {preferences?.external ? (
          <iframe title={t.contact.address} className="aspect-square w-full rounded-sm border border-border" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Beco+dos+Travassos+20+Ad%C3%A9mia+Coimbra&output=embed" />
        ) : (
          <div className="grid aspect-square place-items-center rounded-sm border border-border bg-card p-6 text-center">
            <div><p className="text-sm text-muted-foreground">{EXTRA_CONTENT[lang].consent.mapBlocked}</p><button type="button" onClick={allowExternal} className="btn btn-outline mt-4">{EXTRA_CONTENT[lang].consent.loadMap}</button></div>
          </div>
        )}
      </aside>
    </section>
  </>);
}
