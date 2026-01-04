import { useLanguage } from "@/lib/LanguageContext";
import { JOURNEY_STATS } from "@/lib/constants";
import { BookPreviewCarousel } from "./BookPreviewCarousel";

export default function AboutBookSection() {
  const { t, language } = useLanguage();
  const stats = JOURNEY_STATS[language];

  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 bg-background"
      data-testid="section-about-book"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground"
              data-testid="text-about-heading"
            >
              {t.aboutBook.heading}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p data-testid="text-about-paragraph-1">{t.aboutBook.paragraph1}</p>
              <p data-testid="text-about-paragraph-2">{t.aboutBook.paragraph2}</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4" data-testid="stat-miles">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {stats.distance}
                </p>
                <p className="text-sm text-muted-foreground">{t.aboutBook.statMiles}</p>
              </div>
              <div className="p-4" data-testid="stat-countries">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {JOURNEY_STATS.countries}
                </p>
                <p className="text-sm text-muted-foreground">{t.aboutBook.statCountries}</p>
              </div>
              <div className="p-4" data-testid="stat-stories">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">{t.aboutBook.statJourney}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
            <BookPreviewCarousel />
            <p className="text-center mt-6 text-sm text-muted-foreground font-medium">
              {t.aboutBook.available}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
