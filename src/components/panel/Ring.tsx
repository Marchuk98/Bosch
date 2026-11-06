"use client";

import clsx from "clsx";
import { PROGRAMS, RING_SEGMENTS, segmentFor } from "@/lib/data";
import { programTip, TIPS } from "@/lib/tips";
import { Icon } from "../Icon";
import type { PanelProps } from "./types";
import styles from "./Panel.module.css";

const C = 150;
const R_IN = 112;
const R_OUT = 148;
const GAP_DEG = 2.6;

const SEGMENT_PATHS = Array.from({ length: RING_SEGMENTS }, (_, k) => {
  const step = 360 / RING_SEGMENTS;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const a0 = rad(-90 - step / 2 + k * step + GAP_DEG);
  const a1 = rad(-90 - step / 2 + (k + 1) * step - GAP_DEG);
  const pt = (r: number, a: number) => `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
  return `M${pt(R_IN, a0)}L${pt(R_OUT, a0)}A${R_OUT} ${R_OUT} 0 0 1 ${pt(R_OUT, a1)}L${pt(R_IN, a1)}A${R_IN} ${R_IN} 0 0 0 ${pt(R_IN, a0)}Z`;
});

function programForSegment(k: number) {
  let best = 0;
  let bestDist = Infinity;
  PROGRAMS.forEach((_, i) => {
    const d0 = Math.abs(segmentFor(i) - k);
    const d = Math.min(d0, RING_SEGMENTS - d0);
    if (d < bestDist) [best, bestDist] = [i, d];
  });
  return best;
}

export function Ring({ state, dispatch, onInfo }: PanelProps) {
  const current = segmentFor(state.program);

  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 300 300" className={styles.ringSvg} role="group" aria-label="Кольцо выбора программ">
        {SEGMENT_PATHS.map((d, k) => {
          const isCurrent = state.power && k === current;
          return (
            <path
              key={k}
              d={d}
              className={clsx(styles.segment, isCurrent && styles.segmentCurrent)}
              data-target={isCurrent ? "ring" : undefined}
              data-tip-anchor=""
              onClick={() => {
                const i = programForSegment(k);
                dispatch({ type: "selectProgram", index: i });
                const label = document.querySelector(`[data-target="prog:${PROGRAMS[i]!.id}"]`);
                if (label) onInfo(label, programTip(PROGRAMS[i]!));
              }}
            />
          );
        })}
      </svg>
      <button
        type="button"
        className={clsx(styles.power, state.power && styles.powerOn)}
        data-target="power"
        data-tip-anchor=""
        aria-label="Вкл / Выкл"
        aria-pressed={state.power}
        onClick={(e) => {
          dispatch({ type: "togglePower" });
          onInfo(e.currentTarget, TIPS.power);
        }}
      >
        <Icon name="power" size="44%" strokeWidth={1.4} />
      </button>
    </div>
  );
}
