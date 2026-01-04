import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { useWaitlistForm } from "@/hooks/use-waitlist-form";

export default function PreOrderSection() {
  const { t } = useLanguage();
  const { email, setEmail, isSubmitting, handleSubmit } = useWaitlistForm();

  return (
    <section
      id="preorder"
      className="py-16 md:py-24 lg:py-32 bg-background"
      data-testid="section-preorder"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground"
          data-testid="text-preorder-heading"
        >
          {t.preorder.heading}
        </h2>
        <p
          className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
          data-testid="text-preorder-description"
        >
          {t.preorder.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
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
      </div>
    </section>
  );
}
