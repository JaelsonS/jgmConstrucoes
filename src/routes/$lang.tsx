import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLang } from "@/i18n/content";
import { Footer, Header } from "@/components/site";
import { ConsentManager } from "@/components/consent";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: () => (
    <>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <ConsentManager />
    </>
  ),
});
