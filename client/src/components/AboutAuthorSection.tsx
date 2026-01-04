import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/LanguageContext";
import authorPhoto from "@assets/autorBW_1764948728536.jpeg";

export default function AboutAuthorSection() {
  const { t } = useLanguage();

  return (
    <section
      id="author"
      className="py-16 md:py-24 lg:py-32 bg-card"
      data-testid="section-about-author"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground"
          data-testid="text-author-heading"
        >
          {t.aboutAuthor.heading}
        </h2>
        
        <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 border-4 border-border">
          <AvatarImage
            src={authorPhoto}
            alt="Andrés David Serrano - Author"
            data-testid="img-author-photo"
          />
          <AvatarFallback className="text-2xl font-bold">AD</AvatarFallback>
        </Avatar>
        
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p data-testid="text-author-bio-1">
            {t.aboutAuthor.bio1}
          </p>
          <p data-testid="text-author-bio-2">
            {t.aboutAuthor.bio2}
          </p>
          <p className="text-sm md:text-base italic font-medium pt-4 text-foreground/80" data-testid="text-author-attribution">
            {t.aboutAuthor.attribution.split(":")[0]}: <span className="font-serif font-bold">{t.aboutAuthor.attribution.split(":")[1]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
