import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import heroImage from "@assets/Cotopaxi_1764948376653.jpg";

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToPreorder = () => {
    document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tight"
          data-testid="text-book-title"
        >
          {t.hero.title}
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-8 sm:mb-10 max-w-2xl mx-auto"
          data-testid="text-book-subtitle"
        >
          {t.hero.subtitle}
        </p>
        <Button
          size="lg"
          onClick={scrollToPreorder}
          className="px-8 py-4 text-lg font-semibold backdrop-blur-md bg-primary/90 border border-primary-border"
          data-testid="button-hero-preorder"
        >
          {t.hero.preorderButton}
        </Button>
      </div>
    </section>
  );
}
