import "./polyfills";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locale/en";
import ro from "./locale/ro";

const resources = {
  en,
  ro,
} as const;

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    debug: __DEV__,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    resources,
  });
};

const handleLanguageChange = async (language: string) => {};

i18n.on("languageChanged", handleLanguageChange);
handleLanguageChange(i18n.language);
