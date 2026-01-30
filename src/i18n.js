import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import hi from "./i18n/hi.json";
import ml from "./i18n/ml.json";
import ta from "./i18n/ta.json";
import te from "./i18n/te.json";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ml: { translation: ml },
    ta: { translation: ta },
    te: { translation: te }
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
