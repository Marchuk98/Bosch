"use client";

import { useCallback, useReducer, useRef, useState } from "react";
import { PROGRAMS } from "@/lib/data";
import { programTip } from "@/lib/tips";
import { initialWasherState, washerReducer } from "@/lib/washer";
import { useGuide } from "@/hooks/useGuide";
import { Panel } from "./panel/Panel";
import type { InfoHandler } from "./panel/types";
import { GuideBar, GuidePicker } from "./guide/GuideBar";
import { GuideMarker } from "./guide/GuideMarker";
import { ProgramCards, SettingsTiles, Stickers, SymbolTiles } from "./sections/Sections";
import { Tooltip, type TipState } from "./Tooltip";
import styles from "./WasherApp.module.css";

export function WasherApp() {
  const [state, dispatch] = useReducer(washerReducer, initialWasherState);
  const [tip, setTip] = useState<TipState>(null);
  const stageRef = useRef<HTMLElement>(null);
  const guide = useGuide(dispatch);

  const showInfo = useCallback<InfoHandler>((anchor, content) => {
    setTip((t) => ({ anchor, content, key: (t?.key ?? 0) + 1 }));
  }, []);
  const hideInfo = useCallback(() => setTip(null), []);

  const startGuide = (index: number) => {
    hideInfo();
    guide.start(index);
  };

  const selectFromCard = (index: number) => {
    guide.stop();
    dispatch({ type: "selectProgram", index });
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const label = document.querySelector(`[data-target="prog:${PROGRAMS[index]!.id}"]`);
      if (label) showInfo(label, programTip(PROGRAMS[index]!));
    }, 450);
  };

  return (
    <>
      <section ref={stageRef} className={styles.stage} aria-label="Панель управления">
        <Panel state={state} dispatch={dispatch} onInfo={showInfo} />
        {guide.step && guide.run && (
          <GuideMarker
            stageRef={stageRef}
            target={guide.step.target}
            hold={guide.step.hold}
            number={guide.run.step + 1}
            layoutKey={state}
          />
        )}
      </section>

      <GuideBar guide={guide} />
      <GuidePicker guide={{ ...guide, start: startGuide }} />

      <section className={styles.section}>
        <h2>Программы</h2>
        <ProgramCards onSelect={selectFromCard} />
      </section>

      <section className={styles.section}>
        <h2>Значки на дисплее</h2>
        <SymbolTiles />
      </section>

      <section className={styles.section}>
        <h2>
          Настройки <small>Optionen → Einstellungen → кольцо = номер → ▲▼ = значение</small>
        </h2>
        <SettingsTiles />
      </section>

      <section className={`${styles.section} ${styles.printable}`}>
        <h2>
          Наклейки <small>печать: «Поделиться» → «Напечатать» / Ctrl+P</small>
        </h2>
        <Stickers />
      </section>

      <Tooltip tip={tip} onClose={hideInfo} />
    </>
  );
}
