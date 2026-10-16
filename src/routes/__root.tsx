import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/error";
import { SITE_CONFIG } from "../config/site";

const SITE = SITE_CONFIG.canonicalOrigin;
const OG_IMAGE = `${SITE}/og-image.png`;

function NotFoundComponent() {
  const lang = ((useParams({ strict: false }) as { lang?: string }).lang ?? "pt") as "pt" | "en" | "es";
  const copy = {
    pt: ["Página não encontrada", "A página que procura não existe ou foi movida.", "Voltar ao início"],
    en: ["Page not found", "The page you are looking for does not exist or has been moved.", "Go home"],
    es: ["Página no encontrada", "La página que busca no existe o ha cambiado de dirección.", "Volver al inicio"],
  }[lang] ?? ["Página não encontrada", "A página que procura não existe ou foi movida.", "Voltar ao início"];
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{copy[0]}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{copy[1]}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy[2]}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const lang = ((useParams({ strict: false }) as { lang?: string }).lang ?? "pt") as "pt" | "en" | "es";
  const copy = {
    pt: ["Não foi possível carregar esta página", "Ocorreu um erro. Tente novamente ou volte ao início.", "Tentar novamente", "Voltar ao início"],
    en: ["This page did not load", "Something went wrong. Try again or return home.", "Try again", "Go home"],
    es: ["No se pudo cargar esta página", "Se produjo un error. Inténtelo de nuevo o vuelva al inicio.", "Intentar de nuevo", "Volver al inicio"],
  }[lang] ?? ["Não foi possível carregar esta página", "Ocorreu um erro. Tente novamente ou volte ao início.", "Tentar novamente", "Voltar ao início"];
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {copy[0]}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {copy[1]}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy[2]}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {copy[3]}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JGM Construções" },
      { name: "description", content: "Construção LSF, remodelações e isolamento térmico em Coimbra." },
      { property: "og:title", content: "JGM Construções" },
      { property: "og:description", content: "Construção LSF, remodelações e isolamento térmico em Coimbra." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "JGM Construções" },
      { property: "og:site_name", content: "JGM Construções" },
      { name: "theme-color", content: "#0A0C10" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JGM Construções" },
      { name: "twitter:description", content: "Construção LSF, remodelações e isolamento térmico em Coimbra." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: "JGM Construções",
          legalName: "JGM - Remodelações e Pinturas, Unipessoal Lda.",
          url: "https://jgmconstrucoes.com",
          taxID: "517470942",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Beco dos Travassos, n.º 20, 1.º",
            addressLocality: "Adémia",
            postalCode: "3025-124",
            addressRegion: "Coimbra",
            addressCountry: "PT",
          },
          areaServed: { "@type": "AdministrativeArea", name: "Coimbra" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const p = useParams({ strict: false }) as { lang?: string };
  const lang = p.lang === "en" ? "en" : p.lang === "es" ? "es" : "pt-PT";
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
