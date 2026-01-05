// @ts-expect-error - vite-imagetools query params not recognized by TS module resolution
import authorPhotos from "@assets/author_photo.webp?format=webp;jpg&w=400&quality=80";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/LanguageContext";
import { Section, SectionHeading } from "@/components/ui/section";

export default function AboutAuthorSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="author"
      testId="section-about-author"
      maxWidth="max-w-3xl"
      background="bg-card"
      centered
    >
      <SectionHeading testId="text-author-heading" marginBottom="mb-8">
        {t.aboutAuthor.heading}
      </SectionHeading>

      <Avatar className="mx-auto mb-8 h-32 w-32 border-4 border-border md:h-40 md:w-40">
        <picture>
          <source srcSet={authorPhotos[0]} type="image/webp" />
          <AvatarImage
            src={authorPhotos[1]}
            alt="Andrés David Serrano - Author"
            loading="lazy"
            data-testid="img-author-photo"
          />
        </picture>
        <AvatarFallback className="text-2xl font-bold">AD</AvatarFallback>
      </Avatar>

      <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
        <p data-testid="text-author-bio-1">{t.aboutAuthor.bio1}</p>
        <p
          className="pt-4 text-sm font-medium italic text-foreground/80 md:text-base"
          data-testid="text-author-attribution"
        >
          {t.aboutAuthor.attribution.split(":")[0]}:{" "}
          <span className="font-serif font-bold">
            {t.aboutAuthor.attribution.split(":")[1]}
          </span>
        </p>
      </div>
    </Section>
  );
}
