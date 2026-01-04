import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, NAV_SECTIONS } from "@/lib/constants";
import LanguageToggle from "./LanguageToggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const textStyle = isScrolled
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/80 hover:text-white";

  const logoStyle = isScrolled ? "text-foreground" : "text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className={`font-serif text-lg font-bold transition-colors ${logoStyle}`}
            data-testid="link-logo"
          >
            {SITE_CONFIG.title}
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors ${textStyle}`}
                data-testid={`link-nav-${section.id}`}
              >
                {t.nav[section.translationKey]}
              </button>
            ))}
            <LanguageToggle variant={isScrolled ? "dark" : "light"} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle variant={isScrolled ? "dark" : "light"} />
            <Button
              variant="ghost"
              size="icon"
              className={isScrolled ? "" : "text-white"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-mobile-${section.id}`}
                >
                  {t.nav[section.translationKey]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
