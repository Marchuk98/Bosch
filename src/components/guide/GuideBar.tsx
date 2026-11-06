"use client";

import clsx from "clsx";
import { GUIDES } from "@/lib/guides";
import type { GuideControls } from "@/hooks/useGuide";
import { Icon } from "../Icon";
import styles from "./Guide.module.css";

export function GuideBar({ guide: g }: { guide: GuideControls }) {
  return (
    <div className={clsx(styles.bar, g.run && styles.barActive)} role="region" aria-live="polite" aria-label="Подсказка">
      {g.run && g.guide && g.step ? (
        <>
          <button type="button" className={styles.navBtn} onClick={g.prev} aria-label="Предыдущий шаг">‹</button>
          <span className={styles.num}>{g.run.step + 1}</span>
          <div className={styles.caption}>
            {g.step.text}
            <small>
              {g.guide.title} · шаг {g.run.step + 1} из {g.guide.steps.length}
            </small>
          </div>
          <button type="button" className={styles.navBtn} onClick={g.next} aria-label="Следующий шаг">›</button>
          <button type="button" className={styles.navBtn} onClick={g.stop} aria-label="Закрыть">✕</button>
        </>
      ) : (
        <p className={styles.idle}>👆 Нажмите на любую надпись на панели · или выберите задачу ниже</p>
      )}
    </div>
  );
}

export function GuidePicker({ guide: g }: { guide: GuideControls }) {
  return (
    <div className={styles.picker}>
      {GUIDES.map((item, i) => (
        <button
          key={item.id}
          type="button"
          className={clsx(styles.pick, g.run?.guide === i && styles.pickActive)}
          aria-pressed={g.run?.guide === i}
          onClick={() => g.start(i)}
        >
          <Icon name={item.icon} size={28} />
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}
