import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Section, SectionHeading } from "@/components/ui/section";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0GMdu5nHVcQhnMjNuPqcQWUbzWzK_jo-3kJejArSuej0k-A/viewform?usp=dialog";

export default function PreOrderSection() {
  const { t } = useLanguage();

  // Hide the form when deployed to GitHub Pages (static hosting)
  if (import.meta.env.GITHUB_PAGES) {
    return null;
  }

  return (
    <Section
      id="preorder"
      testId="section-preorder"
      maxWidth="max-w-2xl"
      centered
    >
      <SectionHeading testId="text-preorder-heading" marginBottom="mb-4">
        {t.preorder.heading}
      </SectionHeading>
      <p
        className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg"
        data-testid="text-preorder-description"
      >
        {t.preorder.description}
      </p>

      <div className="mx-auto mb-6 flex justify-center">
        <Button asChild className="px-6" data-testid="button-submit-preorder">
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            {t.preorder.joinButton}
          </a>
        </Button>
      </div>

      <p
        className="text-sm text-muted-foreground"
        data-testid="text-waitlist-count"
      >
        {t.preorder.waitlistCount}
      </p>
    </Section>
  );
}
