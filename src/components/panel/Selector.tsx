"use client";

import clsx from "clsx";
import { LEFT_COLUMN, PROGRAMS, RIGHT_COLUMN, programIndex, type Program } from "@/lib/data";
import { programTip } from "@/lib/tips";
import { Icon } from "../Icon";
import { Ring } from "./Ring";
import type { PanelProps } from "./types";
import styles from "./Panel.module.css";

function ProgramLabel({ program, side, ...panel }: PanelProps & { program: Program; side: "left" | "right" }) {
  const index = programIndex(program.id);
  const selected = panel.state.program === index;
  return (
    <li>
      <button
        type="button"
        className={clsx(styles.program, side === "right" && styles.programRight, selected && styles.programSelected)}
        data-target={`prog:${program.id}`}
        data-tip-anchor=""
        aria-pressed={selected}
        onClick={(e) => {
          panel.dispatch({ type: "selectProgram", index });
          panel.onInfo(e.currentTarget, programTip(PROGRAMS[index]!));
        }}
      >
        <Icon name={program.icon} className={styles.programIcon} />
        <span className={styles.labels}>
          <span className={styles.de}>{program.deShort ?? program.de}</span>
          <span className={styles.ru}>{program.ru}</span>
        </span>
      </button>
    </li>
  );
}

export function Selector(props: PanelProps) {
  return (
    <div className={styles.selector}>
      <ul className={clsx(styles.column, styles.columnLeft)} aria-label="Программы, левая колонка">
        {LEFT_COLUMN.map((p) => (
          <ProgramLabel key={p.id} program={p} side="left" {...props} />
        ))}
      </ul>
      <Ring {...props} />
      <ul className={clsx(styles.column, styles.columnRight)} aria-label="Программы, правая колонка">
        {RIGHT_COLUMN.map((p) => (
          <ProgramLabel key={p.id} program={p} side="right" {...props} />
        ))}
      </ul>
      <p className={styles.made}>Made in Germany</p>
    </div>
  );
}
