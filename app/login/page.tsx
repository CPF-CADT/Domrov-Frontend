import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LoginCard from "@/components/login/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />

      <SectionWrapper>
        <LoginCard />
      </SectionWrapper>

      <Footer />
    </div>
  );
}
