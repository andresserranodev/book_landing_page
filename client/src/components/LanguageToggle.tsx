import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

interface LanguageToggleProps {
  variant?: "light" | "dark";
}

export default function LanguageToggle({ variant = "dark" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={
        variant === "light"
          ? "text-white/80 hover:text-white hover:bg-white/10"
          : ""
      }
      data-testid="button-language-toggle"
      aria-label={`Switch to ${language === "en" ? "Spanish" : "English"}`}
    >
      {language === "en" ? "ES" : "EN"}
    </Button>
  );
}
