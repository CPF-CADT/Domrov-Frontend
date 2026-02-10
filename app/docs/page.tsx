import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocsHero from "@/components/docs/DocsHero";
import DocumentationLayout from "@/components/docs/DocumentationLayout";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col animate-in fade-in duration-500">
      <Header />
      <DocsHero />
      <DocumentationLayout />
      <Footer />
    </div>
  );
}
