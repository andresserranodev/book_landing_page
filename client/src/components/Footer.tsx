import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="py-12 bg-card border-t border-border"
      data-testid="section-footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3
              className="font-serif text-xl font-bold text-foreground"
              data-testid="text-footer-title"
            >
              {SITE_CONFIG.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                aria-label={`Follow on ${link.name}`}
                data-testid={link.testId}
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p
              className="text-sm text-muted-foreground"
              data-testid="text-copyright"
            >
              {t.footer.copyright}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-email"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
