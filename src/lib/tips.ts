import type { TipContent } from "@/components/Tooltip";
import { STAINS, type PanelButton, type Program } from "./data";

export const programTip = (p: Program): TipContent => ({
  title: p.ru,
  subtitle: p.de,
  text: p.hint,
  chips: [
    ["кг", p.load],
    ["°C", p.maxTemp === "auto" ? "авто" : p.maxTemp === null ? "—" : String(p.maxTemp)],
    ["об/мин", p.maxSpin === null ? "—" : String(p.maxSpin)],
  ],
});

export const buttonTip = (b: PanelButton): TipContent => ({
  title: b.ru.join(" "),
  subtitle: b.de,
  text: b.tip,
  hold: b.hold,
});

export const TIPS = {
  power: { title: "Вкл / Выкл", subtitle: "⏻", text: "Не реагирует — держать 5 с для перезапуска." },
  options: { title: "Опции", subtitle: "Optionen", text: "Показать / скрыть доп. кнопки (тусклые)." },
  start: {
    title: "Старт / Пауза",
    subtitle: "Start/Nachlegen",
    text: "Старт · пауза (докинуть вещь) · отмена. Первые 2 мин машина взвешивает бельё.",
  },
  temp: { title: "Температура", subtitle: "°C", text: "▲▼ — изменить. kalt = холодная вода." },
  spin: {
    title: "Отжим",
    subtitle: "U/min",
    text: "▲▼ — изменить. 0 = только слив. Ниже нуля — «Stop»: бельё остаётся в воде.",
  },
  time: {
    title: "Время / Готово через",
    subtitle: "Fertig in",
    text: "Оставшееся время. ▲▼ — через сколько часов закончить (до 24 ч), затем ▷.",
  },
} satisfies Record<string, TipContent>;

export const stainsTip = (index: number): TipContent => ({
  title: "Пятна",
  subtitle: "Flecken",
  text: index < 0 ? "Выкл. Жмите ещё — выбор типа пятна." : `Выбрано: ${STAINS[index]!.ru}. Жмите ещё — следующее.`,
});

export const stainTip = (index: number): TipContent => ({
  title: STAINS[index]!.ru,
  subtitle: STAINS[index]!.de,
  text: "Выбирается кнопкой «Flecken» (несколько нажатий).",
});
