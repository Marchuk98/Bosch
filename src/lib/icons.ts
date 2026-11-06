const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

const rect = (x: number, y: number, w: number, h: number, r = 0) =>
  r === 0
    ? `M${x} ${y}h${w}v${h}h${-w}z`
    : `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

const SHIRT = "M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z";
const DROP = "M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z";

export const ICONS = {
  iron: ["M4 18h15l2-6H10a6 6 0 0 0-6 6z", "M9 3c0 1.5 1 1.5 1 3M13 3c0 1.5 1 1.5 1 3M17 3c0 1.5 1 1.5 1 3"],
  hygiene: [rect(4, 4, 16, 16, 3), "M12 8v8M8 12h8"],
  stopwatch: [circle(12, 13, 8), "M12 9v4l3 2M10 2h4"],
  shirt: [SHIRT],
  sport: [SHIRT, "M11 12h2v5"],
  shirtPlus: ["M7 4 3 6.5l1.6 3.2L7 9v10h7V9l2.4.7", "M14 4a3.5 3.5 0 0 1-7 0", "M19 3v6M16 6h6"],
  spin: ["M12 12a1.5 1.5 0 0 1 3 0 3 3 0 0 1-6 0 4.5 4.5 0 0 1 9 0 6 6 0 0 1-12 0"],
  rinse: ["M3 11h18l-2 8H5z", "M6 6c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0"],
  eco: ["M5 19C5 10 11 5 20 5c0 9-5 15-14 14", "M5 19l8-8"],
  cotton: [circle(12, 12, 2.5), "M12 9.5a3 3 0 1 1 3-3M9.5 12a3 3 0 1 1-3-3M14.5 12a3 3 0 1 1 3 3M12 14.5a3 3 0 1 1-3 3"],
  mix: [
    "M3 7l3-2a2 2 0 0 0 4 0l3 2-1 3-2-1v7H6V9l-2 1z",
    "M13 13l2.5-1.5a1.6 1.6 0 0 0 3 0L21 13l-.8 2.4-1.5-.6V21h-4.6v-6.2l-1.5.6z",
  ],
  delicate: ["M12 20c0-6 0-10-7-14 0 6 2 9 7 10M12 20c0-6 0-10 7-14 0 6-2 9-7 10"],
  wool: [circle(12, 12, 8), "M6 7c4 2 8 6 10 12M4.5 13c4 0 8 2 9.5 7M10 4.2c4 3 8 8 9.8 9.5"],
  app: [rect(6, 2, 12, 20, 2), "M9 6h6M9 10h6M9 14h3"],
  drop: [DROP],
  star: ["M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"],
  gear: [circle(12, 12, 3), "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"],
  key: [circle(7, 12, 4), "M11 12h10M18 12v3M21 12v3"],
  rinsePlus: ["M4 9h16", "M12 3v6", "M7 13v2M12 13v5M17 13v2M9.5 17v2M14.5 17v2"],
  miniLoad: ["M9.5 8 6.5 10l1 2 2-.6V18h5v-6.6l2 .6 1-2-3-2a2.5 2.5 0 0 1-5 0z"],
  prewash: ["M12 4v10M8 10l4 4 4-4M4 20h16"],
  clock: [circle(12, 12, 9), "M12 7v5l3 3"],
  speed: ["M21 12a9 9 0 1 1-9-9", "M12 7v5l3 2", "M15 3h6v6"],
  remote: [rect(6, 3, 10, 18, 2), "M18 8l3-3M21 8V5h-3"],
  wifi: ["M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0", circle(12, 19.5, 0.8)],
  grass: ["M4 20c2-6 3-10 3-14M10 20c0-5 1-9 3-13M16 20c0-4 2-8 5-11"],
  wine: ["M8 3h8c0 5-1.5 7-4 7s-4-2-4-7zM12 10v9M8 21h8"],
  sweat: ["M8 4c2.5 3 3.5 5 3.5 7a3.5 3.5 0 0 1-7 0c0-2 1-4 3.5-7zM16 10c2 2.5 3 4 3 5.5a3 3 0 0 1-6 0c0-1.5 1-3 3-5.5z"],
  oil: ["M9 3h6M10 3v3l-3 3v12h10V9l-3-3V3"],
  tomato: [circle(12, 14, 7), "M9 6l3 2 3-2M12 8V4"],
  stain: [DROP, "M9 14h6"],
  power: ["M12 3v8", "M7.5 6.5a7 7 0 1 0 9 0"],
  playPause: ["M5 5v14M9 5v14M13 5l8 7-8 7z"],
  plus: [circle(12, 12, 9), "M12 8v8M8 12h8"],
  cross: [circle(12, 12, 9), "M9 9l6 6M15 9l-6 6"],
  drumClean: [circle(12, 12, 9), circle(12, 12, 5), "M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"],
  doorLock: [circle(12, 12, 9), rect(9, 11, 6, 5, 1), "M10 11V9a2 2 0 0 1 4 0v2"],
  foam: [circle(8, 15, 4), circle(15, 10, 5), circle(17, 18, 2.5)],
  tap: ["M4 8h9a3 3 0 0 1 3 3v2M8 5v3M5 5h6", "M16 17c1 1.5 1.5 2.3 1.5 3a1.5 1.5 0 0 1-3 0c0-.7.5-1.5 1.5-3z"],
  drawer: [rect(3, 6, 18, 12, 2), "M9 12h6"],
  bell: ["M6 16V11a6 6 0 0 1 12 0v5l2 2H4z", "M10 21h4"],
  touch: [
    "M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V4a1.5 1.5 0 0 1 3 0v6M15 10V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7c-3 0-4.5-1.5-6-4l-2-3.5a1.5 1.5 0 0 1 2.5-1.5L9 14V8a1.5 1.5 0 0 1 3 0",
  ],
  sun: [circle(12, 12, 4), "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"],
  reset: ["M4 12a8 8 0 1 0 2.5-5.8", "M4 4v4h4"],
  counter: [rect(3, 5, 18, 14, 2), "M7 15V9M11 15V9h2M17 9h-3v3h3v3h-3"],
  basket: ["M3 9h18l-2 10H5z", "M8 9l3-5M16 9l-3-5"],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;
