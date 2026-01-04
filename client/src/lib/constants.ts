import {
  InstagramIcon,
  FacebookIcon,
  XIcon,
} from "@/components/icons/SocialIcons";
import type { Language } from "./translations";

export const SITE_CONFIG = {
  title: "Un Andrés Más",
  email: "hello@unandreasmas.com",
} as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "#",
    testId: "link-instagram",
  },
  { name: "Facebook", icon: FacebookIcon, href: "#", testId: "link-facebook" },
  { name: "X", icon: XIcon, href: "#", testId: "link-twitter" },
] as const;

export const NAV_SECTIONS = [
  { id: "about", translationKey: "aboutBook" as const },
  { id: "author", translationKey: "author" as const },
  { id: "preorder", translationKey: "preorder" as const },
] as const;

export const JOURNEY_STATS: Record<Language, { distance: string }> & {
  countries: number;
} = {
  en: { distance: "15,000" },
  es: { distance: "24,000" },
  countries: 7,
};
