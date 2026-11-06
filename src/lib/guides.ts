import type { IconName } from "./icons";
import type { WasherAction } from "./washer";

export type GuideStep = {
  target: string;
  text: string;
  hold?: boolean;
  effect?: WasherAction;
};

export type Guide = { id: string; icon: IconName; title: string; steps: GuideStep[] };

export const GUIDES: readonly Guide[] = [
  {
    id: "wash", icon: "basket", title: "Постирать",
    steps: [
      { target: "power", text: "Включить" },
      { target: "prog:cotton", text: "Выбрать программу", effect: { type: "selectProgramById", id: "cotton" } },
      { target: "temp-up", text: "Температура ▲▼" },
      { target: "spin-up", text: "Отжим ▲▼" },
      { target: "start", text: "Старт ▷" },
    ],
  },
  {
    id: "add", icon: "plus", title: "Докинуть вещь",
    steps: [
      { target: "start", text: "Пауза" },
      { target: "start", text: "Дверца открылась → докиньте → снова ▷" },
    ],
  },
  {
    id: "cancel", icon: "cross", title: "Отменить",
    steps: [
      { target: "start", text: "Пауза" },
      { target: "prog:spin", text: "Выбрать «Отжим / Слив»", effect: { type: "selectProgramById", id: "spin" } },
      { target: "start", text: "Старт — вода сольётся" },
    ],
  },
  {
    id: "delay", icon: "clock", title: "Отложить",
    steps: [
      { target: "prog:cotton", text: "Программа", effect: { type: "selectProgramById", id: "cotton" } },
      { target: "btn:finishIn", text: "Готово через" },
      { target: "time-up", text: "▲ — через сколько часов закончить", effect: { type: "finishIn", delta: 1 } },
      { target: "start", text: "Старт ▷" },
    ],
  },
  {
    id: "lock", icon: "key", title: "Блок от детей",
    steps: [{ target: "btn:lock", text: "Держать 3 с — вкл / выкл", hold: true }],
  },
  {
    id: "phone", icon: "remote", title: "Телефон",
    steps: [
      { target: "btn:remote", text: "Держать 3 с → приложение Home Connect", hold: true },
      { target: "btn:remote", text: "Коротко — разрешить старт с телефона" },
    ],
  },
  {
    id: "idos", icon: "drop", title: "Дозатор i-DOS",
    steps: [
      { target: "btn:idos1", text: "Держать 3 с — настройка дозы", hold: true },
      { target: "temp-up", text: "▲▼ — доза (мл)" },
      { target: "btn:idos1", text: "Коротко — вкл / выкл" },
    ],
  },
  {
    id: "drum", icon: "drumClean", title: "Чистка барабана",
    steps: [
      { target: "prog:cotton", text: "Хлопок, без белья", effect: { type: "selectProgramById", id: "cotton" } },
      { target: "temp-up", text: "90 °C", effect: { type: "setTempMax" } },
      { target: "start", text: "Старт ▷" },
    ],
  },
  {
    id: "favorite", icon: "star", title: "Избранное",
    steps: [
      { target: "options", text: "Optionen — показать кнопки", effect: { type: "openOptions" } },
      { target: "btn:favorite", text: "Держать 3 с — сохранить", hold: true },
      { target: "btn:favorite", text: "Коротко — вызвать" },
    ],
  },
  {
    id: "settings", icon: "gear", title: "Настройки",
    steps: [
      { target: "options", text: "Optionen", effect: { type: "openOptions" } },
      { target: "btn:settings", text: "Einstellungen" },
      { target: "ring", text: "Кольцо — номер настройки" },
      { target: "temp-up", text: "▲▼ — значение" },
      { target: "btn:settings", text: "Выход" },
    ],
  },
  {
    id: "stains", icon: "stain", title: "Пятна",
    steps: [
      { target: "stains", text: "Жать, пока не загорится нужное" },
      { target: "stain:2", text: "Например «Красное вино»", effect: { type: "setStain", index: 2 } },
      { target: "start", text: "Старт ▷" },
    ],
  },
];
