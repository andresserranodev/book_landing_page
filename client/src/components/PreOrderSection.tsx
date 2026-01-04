import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { useWaitlistForm } from "@/hooks/use-waitlist-form";
import { Section, SectionHeading } from "@/components/ui/section";

export default function PreOrderSection() {
  const { t } = useLanguage();
  const { email, setEmail, isSubmitting, handleSubmit } = useWaitlistForm();

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

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-6 flex max-w-md flex-col gap-3 sm:flex-row"
        data-testid="form-preorder"
      >
        <Input
          type="email"
          placeholder={t.preorder.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          data-testid="input-email"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-6"
          data-testid="button-submit-preorder"
        >
          {isSubmitting ? t.preorder.joiningButton : t.preorder.joinButton}
        </Button>
      </form>

      <p
        className="text-sm text-muted-foreground"
        data-testid="text-waitlist-count"
      >
        {t.preorder.waitlistCount}
      </p>
    </Section>
  );
}
