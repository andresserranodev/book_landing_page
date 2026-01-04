import { translations } from "./translations";

describe("Translations", () => {
  it("has matching top-level keys in English and Spanish", () => {
    const enKeys = Object.keys(translations.en).sort();
    const esKeys = Object.keys(translations.es).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it("has matching nested keys for all sections", () => {
    const enSections = Object.keys(translations.en);

    enSections.forEach((section) => {
      const enKeys = Object.keys(
        translations.en[section as keyof typeof translations.en]
      ).sort();
      const esKeys = Object.keys(
        translations.es[section as keyof typeof translations.es]
      ).sort();

      expect(esKeys).toEqual(enKeys);
    });
  });

  it("has no empty translation strings in English", () => {
    const checkEmpty = (obj: any, path = "en") => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullPath = `${path}.${key}`;
        if (typeof value === "string") {
          expect(value.length).toBeGreaterThan(0);
        } else if (typeof value === "object" && value !== null) {
          checkEmpty(value, fullPath);
        }
      });
    };

    checkEmpty(translations.en);
  });

  it("has no empty translation strings in Spanish", () => {
    const checkEmpty = (obj: any, path = "es") => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullPath = `${path}.${key}`;
        if (typeof value === "string") {
          expect(value.length).toBeGreaterThan(0);
        } else if (typeof value === "object" && value !== null) {
          checkEmpty(value, fullPath);
        }
      });
    };

    checkEmpty(translations.es);
  });

  it("has all required navigation keys", () => {
    expect(translations.en.nav).toHaveProperty("aboutBook");
    expect(translations.en.nav).toHaveProperty("author");
    expect(translations.en.nav).toHaveProperty("preorder");

    expect(translations.es.nav).toHaveProperty("aboutBook");
    expect(translations.es.nav).toHaveProperty("author");
    expect(translations.es.nav).toHaveProperty("preorder");
  });

  it("has all required hero keys", () => {
    expect(translations.en.hero).toHaveProperty("title");
    expect(translations.en.hero).toHaveProperty("subtitle");
    expect(translations.en.hero).toHaveProperty("preorderButton");

    expect(translations.es.hero).toHaveProperty("title");
    expect(translations.es.hero).toHaveProperty("subtitle");
    expect(translations.es.hero).toHaveProperty("preorderButton");
  });

  it("has all required preorder keys", () => {
    expect(translations.en.preorder).toHaveProperty("heading");
    expect(translations.en.preorder).toHaveProperty("description");
    expect(translations.en.preorder).toHaveProperty("emailPlaceholder");
    expect(translations.en.preorder).toHaveProperty("joinButton");
    expect(translations.en.preorder).toHaveProperty("successTitle");
    expect(translations.en.preorder).toHaveProperty("successDescription");

    expect(translations.es.preorder).toHaveProperty("heading");
    expect(translations.es.preorder).toHaveProperty("description");
    expect(translations.es.preorder).toHaveProperty("emailPlaceholder");
    expect(translations.es.preorder).toHaveProperty("joinButton");
    expect(translations.es.preorder).toHaveProperty("successTitle");
    expect(translations.es.preorder).toHaveProperty("successDescription");
  });
});
