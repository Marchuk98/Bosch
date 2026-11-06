import type { IconName } from "./icons";

export type ProgramId =
  | "eco" | "cotton" | "synth" | "mix" | "delicate" | "wool" | "app"
  | "rinse" | "spin" | "synthPlus" | "sport" | "extraShort" | "hygiene" | "iron";

export type Program = {
  id: ProgramId;
  icon: IconName;
  de: string;
  deShort?: string;
  ru: string;
  load: string;
  maxTemp: number | "auto" | null;
  defaultTemp?: number;
  maxSpin: number | null;
  hint: string;
};

export const PROGRAMS: readonly Program[] = [
  { id: "eco", icon: "eco", de: "Eco 40-60", ru: "Эко 40–60", load: "9", maxTemp: "auto", maxSpin: 1400,
    hint: "Хлопок и лён. Температуру машина ставит сама. Самая экономная." },
  { id: "cotton", icon: "cotton", de: "Baumwolle", ru: "Хлопок", load: "9", maxTemp: 90, defaultTemp: 40, maxSpin: 1400,
    hint: "Бельё, полотенца, футболки, джинсы." },
  { id: "synth", icon: "shirt", de: "Pflegeleicht", ru: "Синтетика", load: "4", maxTemp: 60, defaultTemp: 40, maxSpin: 1400,
    hint: "Синтетика и смесовые ткани." },
  { id: "mix", icon: "mix", de: "Schnell/Mix", ru: "Быстро / Микс", load: "4", maxTemp: 60, defaultTemp: 40, maxSpin: 1400,
    hint: "Хлопок и синтетика вместе, слегка грязное." },
  { id: "delicate", icon: "delicate", de: "Fein/Seide", ru: "Деликатное / Шёлк", load: "2", maxTemp: 40, defaultTemp: 30, maxSpin: 800,
    hint: "Шёлк, вискоза. Лучше в мешке для стирки." },
  { id: "wool", icon: "wool", de: "Wolle", ru: "Шерсть", load: "2", maxTemp: 40, defaultTemp: 30, maxSpin: 800,
    hint: "Шерсть. Средство для шерсти." },
  { id: "app", icon: "app", de: "App", ru: "Приложение", load: "—", maxTemp: null, maxSpin: null,
    hint: "Доп. программы из Home Connect на телефоне." },
  { id: "rinse", icon: "rinse", de: "Spülen", ru: "Полоскание", load: "—", maxTemp: null, maxSpin: 1400,
    hint: "Полоскание + отжим + слив." },
  { id: "spin", icon: "spin", de: "Schleudern/Abpumpen", deShort: "Schleudern", ru: "Отжим / Слив", load: "—", maxTemp: null, maxSpin: 1400,
    hint: "Отжим и слив. Отжим «0» — только слив." },
  { id: "synthPlus", icon: "shirtPlus", de: "Pflegeleicht Plus", ru: "Синтетика Плюс", load: "?", maxTemp: null, maxSpin: null,
    hint: "Синтетика, бережнее. Лимиты — в бумажной инструкции." },
  { id: "sport", icon: "sport", de: "Sportswear", ru: "Спорт", load: "2", maxTemp: 40, defaultTemp: 30, maxSpin: 800,
    hint: "Спортивная одежда. Без кондиционера!" },
  { id: "extraShort", icon: "stopwatch", de: "Extra Kurz 15'/30'", deShort: "Extra Kurz 15′/30′", ru: "Быстрая 15′/30′", load: "4",
    maxTemp: 40, defaultTemp: 30, maxSpin: 1200, hint: "30 мин. С «Ускорить» — 15 мин (до 2 кг)." },
  { id: "hygiene", icon: "hygiene", de: "Hygiene Plus", ru: "Гигиена Плюс", load: "6,5", maxTemp: 60, defaultTemp: 60, maxSpin: 1400,
    hint: "Для аллергиков. Температура держится постоянно." },
  { id: "iron", icon: "iron", de: "Iron Assist", ru: "Лёгкая глажка", load: "5 шт", maxTemp: null, maxSpin: null,
    hint: "Пар для СУХИХ рубашек — легче гладить. Без порошка." },
];

export const programIndex = (id: ProgramId) => PROGRAMS.findIndex((p) => p.id === id);

export const RIGHT_COLUMN = PROGRAMS.slice(0, 7);
export const LEFT_COLUMN = PROGRAMS.slice(7).reverse();

export const RING_SEGMENTS = 20;
export const segmentFor = (i: number) => (1 + Math.round((i * 18) / (PROGRAMS.length - 1))) % RING_SEGMENTS;

export const TEMPS = ["kalt", 20, 30, 40, 60, 90] as const;
export const SPINS = [0, 400, 600, 800, 1000, 1200, 1400] as const;

export type Stain = { icon: IconName; de: string; ru: string };

export const STAINS: readonly Stain[] = [
  { icon: "drop", de: "Blut", ru: "Кровь" },
  { icon: "grass", de: "Gras", ru: "Трава" },
  { icon: "wine", de: "Rotwein", ru: "Красное вино" },
  { icon: "sweat", de: "Schweiß", ru: "Пот" },
  { icon: "oil", de: "Butter/Öl", ru: "Масло / жир" },
  { icon: "tomato", de: "Tomate", ru: "Томат" },
];

export type ButtonId =
  | "idos1" | "idos2" | "favorite" | "settings" | "lock"
  | "rinsePlus" | "miniLoad" | "prewash" | "finishIn" | "speed" | "remote";

export type PanelButton = {
  id: ButtonId;
  icon: IconName;
  de: string;
  ru: string[];
  extra?: boolean;
  toggle?: boolean;
  hold?: boolean;
  tip: string;
};

export const TOP_LEFT_BUTTONS: readonly PanelButton[] = [
  { id: "idos1", icon: "drop", de: "i-DOS 1", ru: ["Дозатор 1"], toggle: true, hold: true,
    tip: "Авто-дозировка жидкого средства. Держать 3 с — настроить дозу (мл)." },
  { id: "idos2", icon: "drop", de: "i-DOS 2", ru: ["Дозатор 2"], toggle: true, hold: true,
    tip: "Авто-дозировка кондиционера. Держать 3 с — что залито и доза." },
];

export const TOP_RIGHT_BUTTONS: readonly PanelButton[] = [
  { id: "favorite", icon: "star", de: "Favorit", ru: ["Избранное"], extra: true, hold: true,
    tip: "Держать 3 с — сохранить свои настройки. Коротко — вызвать." },
  { id: "settings", icon: "gear", de: "Einstellungen", ru: ["Настройки"], extra: true,
    tip: "Звук, яркость, сброс. Номер — кольцом, значение — ▲▼." },
  { id: "lock", icon: "key", de: "3 Sek.", ru: ["Блок от детей"], toggle: true, hold: true,
    tip: "Блокировка от детей. Держать 3 с — вкл / выкл." },
];

export const BOTTOM_BUTTONS: readonly PanelButton[] = [
  { id: "rinsePlus", icon: "rinsePlus", de: "Intensiv Spülen", ru: ["Интенсивное", "полоскание"], extra: true, toggle: true,
    tip: "+3 полоскания. Для аллергиков и детских вещей." },
  { id: "miniLoad", icon: "miniLoad", de: "Mini Load", ru: ["Малая загрузка"], extra: true, toggle: true,
    tip: "Пара вещей, до 0,5 кг." },
  { id: "prewash", icon: "prewash", de: "Vorwäsche", ru: ["Предстирка"], extra: true, toggle: true,
    tip: "Предварительная стирка для сильной грязи." },
  { id: "finishIn", icon: "clock", de: "Fertig in", ru: ["Готово через"],
    tip: "Отложенный старт: через сколько часов закончить (до 24 ч). Часы — ▲▼ над временем." },
  { id: "speed", icon: "speed", de: "SpeedPerfect", ru: ["Ускорить"], toggle: true,
    tip: "Быстрее, тот же результат. Чуть больше электричества." },
  { id: "remote", icon: "remote", de: "Fernstart", ru: ["Старт с телефона"], toggle: true, hold: true,
    tip: "Разрешить запуск из Home Connect. Держать 3 с — настройка Wi-Fi." },
];

export const ALL_BUTTONS = [...TOP_LEFT_BUTTONS, ...TOP_RIGHT_BUTTONS, ...BOTTOM_BUTTONS];

export const SYMBOLS: readonly { icon: IconName | "END"; title: string; text: string; blink?: boolean }[] = [
  { icon: "key", title: "Замок", text: "блокировка" },
  { icon: "wifi", title: "Wi-Fi", text: "мигает — подключение" },
  { icon: "doorLock", title: "Дверца", text: "мигает — не закрыта" },
  { icon: "drop", title: "i-DOS", text: "мигает — долить", blink: true },
  { icon: "drumClean", title: "Барабан", text: "мигает — почистить", blink: true },
  { icon: "foam", title: "Пена", text: "много средства" },
  { icon: "tap", title: "Кран", text: "нет воды" },
  { icon: "drawer", title: "Лоток", text: "не задвинут" },
  { icon: "END", title: "Конец", text: "можно доставать" },
];

export const SETTINGS: readonly { n: number; icon: IconName; title: string; range: string }[] = [
  { n: 1, icon: "bell", title: "Сигнал конца", range: "0–4" },
  { n: 2, icon: "touch", title: "Звук кнопок", range: "0–4" },
  { n: 3, icon: "sun", title: "Яркость", range: "1–4" },
  { n: 5, icon: "drumClean", title: "Напоминание о чистке", range: "on / oFF" },
  { n: 6, icon: "counter", title: "Счётчик стирок", range: "PC" },
  { n: 7, icon: "reset", title: "Сброс", range: "rES · 3 с" },
];
