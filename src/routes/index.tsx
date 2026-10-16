import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "pt" } });
  },
  head: () => ({
    meta: [
      { title: "JGM Construções — Construção, LSF e remodelações em Coimbra" },
      { name: "description", content: "Construção LSF, remodelações e isolamento térmico em Coimbra." },
      { property: "og:title", content: "JGM Construções" },
      { property: "og:description", content: "Construção LSF, remodelações e isolamento térmico em Coimbra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
