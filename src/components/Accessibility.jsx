// src/components/Accessibility.jsx
import { useEffect, useState } from "react";
import { PersonStanding, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import "./accessibility.scss";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ml", label: "മലയാളം" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
];

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function applyTextScale(scale) {
  document.documentElement.style.fontSize = `${16 * scale}px`;
  localStorage.setItem("textScale", String(scale));
}

function applyLang(code) {
  i18n.changeLanguage(code);
  localStorage.setItem("lang", code);
}

export default function Accessibility() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [textScale, setTextScale] = useState(Number(localStorage.getItem("textScale")) || 1);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [voiceOn, setVoiceOn] = useState(localStorage.getItem("voiceOn") === "true");

  useEffect(() => applyTextScale(textScale), [textScale]);
  useEffect(() => applyTheme(theme), [theme]);
  useEffect(() => applyLang(lang), [lang]);
  useEffect(() => localStorage.setItem("voiceOn", String(voiceOn)), [voiceOn]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const decText = () => setTextScale((s) => Math.max(0.9, s - 0.1));
  const incText = () => setTextScale((s) => Math.min(1.4, s + 0.1));
  const resetText = () => setTextScale(1);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleVoice = () => setVoiceOn((v) => !v);

  return (
    <>
      {/* Floating Button */}
      <button className="accessibility-btn" onClick={() => setOpen(true)}>
        <PersonStanding />
      </button>

      {/* Backdrop */}
      <div className={`acc-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />

      {/* Drawer */}
      <aside className={`acc-drawer ${open ? "open" : ""}`}>
        <div className="acc-header">
          <h3>{t("accessibility")}</h3>
          <button className="acc-close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="acc-section">
          {/* Text Size */}
          <div className="acc-row">
            <div>
              <div className="acc-title">{t("text_size")}</div>
              <div className="acc-sub">{t("adjust_readability")}</div>
            </div>
            <div className="acc-actions">
              <button onClick={decText}>A-</button>
              <button onClick={resetText}>A</button>
              <button onClick={incText}>A+</button>
            </div>
          </div>

          <div className="acc-divider" />

          {/* Theme */}
          <div className="acc-row">
            <div>
              <div className="acc-title">{t("dark_light")}</div>
              <div className="acc-sub">{t("better_visibility")}</div>
            </div>
            <button className="acc-toggle" onClick={toggleTheme}>
              {theme === "light" ? t("switch_to_dark") : t("switch_to_light")}
            </button>
          </div>

          <div className="acc-divider" />

          {/* Language */}
          <div className="acc-row">
            <div>
              <div className="acc-title">{t("language")}</div>
              <div className="acc-sub">{t("choose_language")}</div>
            </div>
            <select className="acc-select" value={lang} onChange={(e) => setLang(e.target.value)}>
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="acc-divider" />

          {/* Voice */}
          <div className="acc-row">
            <div>
              <div className="acc-title">{t("voice_assist")}</div>
              <div className="acc-sub">{t("voice_demo")}</div>
            </div>
            <button className={`acc-pill ${voiceOn ? "on" : ""}`} onClick={toggleVoice}>
              {voiceOn ? t("on") : t("off")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
