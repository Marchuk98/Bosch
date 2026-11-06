import clsx from "clsx";
import { ALL_BUTTONS, PROGRAMS, SETTINGS, STAINS, SYMBOLS } from "@/lib/data";
import type { IconName } from "@/lib/icons";
import { Icon } from "../Icon";
import styles from "./Sections.module.css";

export function ProgramCards({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <div className={styles.programs}>
      {PROGRAMS.map((p, i) => (
        <button key={p.id} type="button" className={styles.card} onClick={() => onSelect(i)}>
          <Icon name={p.icon} size={32} strokeWidth={1.5} />
          <span className={styles.cardRu}>{p.ru}</span>
          <span className={styles.cardDe}>{p.de}</span>
          <span className={styles.stats}>
            <span><b>{p.load}</b>кг</span>
            <span><b>{p.maxTemp === "auto" ? "авто" : p.maxTemp ?? "—"}</b>°C</span>
            <span><b>{p.maxSpin ?? "—"}</b>об/мин</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function SymbolTiles() {
  return (
    <div className={styles.tiles}>
      {SYMBOLS.map((s) => (
        <div key={s.title} className={styles.tile}>
          <span className={clsx(styles.tileIcon, s.blink && styles.blink)}>
            {s.icon === "END" ? <span className={styles.end}>End</span> : <Icon name={s.icon} size={30} />}
          </span>
          <b>{s.title}</b>
          <span>{s.text}</span>
        </div>
      ))}
    </div>
  );
}

export function SettingsTiles() {
  return (
    <div className={styles.tiles}>
      {SETTINGS.map((s) => (
        <div key={s.n} className={styles.tile}>
          <span className={styles.settingNo}>{s.n}</span>
          <span className={styles.tileIcon}><Icon name={s.icon} size={30} /></span>
          <b>{s.title}</b>
          <span>{s.range}</span>
        </div>
      ))}
    </div>
  );
}

const STICKERS: { icon: IconName; ru: string; de: string }[] = [
  ...PROGRAMS.map((p) => ({ icon: p.icon, ru: p.ru, de: p.de })),
  { icon: "power", ru: "Вкл / Выкл", de: "⏻" },
  { icon: "playPause", ru: "Старт / Пауза", de: "Start/Pause" },
  ...ALL_BUTTONS.map((b) => ({ icon: b.icon, ru: b.ru.join(" "), de: b.de })),
  { icon: "stain", ru: "Пятна", de: "Flecken" },
  ...STAINS.map((s) => ({ icon: s.icon, ru: s.ru, de: s.de })),
];

export function Stickers() {
  return (
    <div className={styles.stickers}>
      {STICKERS.map((s) => (
        <div key={s.de + s.ru} className={styles.sticker}>
          <Icon name={s.icon} size={20} />
          <span>
            <b>{s.de}</b>
            <span>{s.ru}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
