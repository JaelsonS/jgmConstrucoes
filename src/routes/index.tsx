import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "pt" } });
  },
  head: () => ({
    meta: [
      { title: "JGM Construções — obras e remodelações em Coimbra" },
      { name: "description", content: "Construção, remodelações, pintura e isolamento térmico a partir de Adémia, Coimbra." },
      { property: "og:title", content: "JGM Construções" },
      { property: "og:description", content: "Construção, remodelações, pintura e isolamento térmico a partir de Adémia, Coimbra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
