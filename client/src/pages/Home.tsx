import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutBookSection from "@/components/AboutBookSection";
import AboutAuthorSection from "@/components/AboutAuthorSection";
import PreOrderSection from "@/components/PreOrderSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutBookSection />
        <AboutAuthorSection />
        <PreOrderSection />
      </main>
      <Footer />
    </div>
  );
}
