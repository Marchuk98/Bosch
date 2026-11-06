"use client";

import { Display } from "./Display";
import { Selector } from "./Selector";
import type { PanelProps } from "./types";
import styles from "./Panel.module.css";

export function Panel(props: PanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.selectorWrap}>
        <Selector {...props} />
      </div>
      <div className={styles.displayWrap}>
        <Display {...props} />
      </div>
    </div>
  );
}
