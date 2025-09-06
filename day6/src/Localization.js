import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  en: {
    title: "Tic-Tac-Toe",
    play: "Play",
    backToMenu: "Back to main menu",
    languageGame: "Language game",
    en: "English",
    ru: "Russian",
    turn: "Turn",
    winner: "WINNER",
    draw: "DRAW",
    restart: "Restart",
    clearScore: "Clear score",
  },
  ru: {
    title: "Крестики-нолики",
    play: "Играть",
    backToMenu: "Назад в главное меню",
    languageGame: "Язык игры",
    en: "Английский",
    ru: "Русский",
    turn: "Ход",
    winner: "ПОБЕДИТЕЛЬ",
    draw: "НИЧЬЯ",
    restart: "Заново",
    clearScore: "Очистить счёт",
  },
};

const i18n = new I18n(translations);

const deviceLocale = Localization.locales?.[0] || "en";

// Set locale
i18n.locale = deviceLocale.startsWith("ru") ? "ru" : "en";

i18n.enableFallback = true;

export default i18n;
