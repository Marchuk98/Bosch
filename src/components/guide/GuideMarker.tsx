"use client";

import clsx from "clsx";
import { useLayoutEffect, useState, type RefObject } from "react";
import styles from "./Guide.module.css";

type Props = {
  stageRef: RefObject<HTMLElement | null>;
  target: string;
  number: number;
  hold?: boolean;
  layoutKey: unknown;
};

type Box = { x: number; y: number; size: number };

const BOTTOM_RESERVE = 110;

export function GuideMarker({ stageRef, target, number, hold, layoutKey }: Props) {
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const el = stage.querySelector<HTMLElement | SVGElement>(`[data-target="${CSS.escape(target)}"]`);
      if (!el) return setBox(null);
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const size = Math.min(96, Math.max(50, Math.min(r.width, r.height) * 0.9 + 18));
      setBox({ x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top, size });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("resize", measure);

    const el = stage.querySelector(`[data-target="${CSS.escape(target)}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.top < 8 || r.bottom > window.innerHeight - BOTTOM_RESERVE) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stageRef, target, layoutKey]);

  if (!box) return null;

  return (
    <div
      className={clsx(styles.marker, hold && styles.markerHold)}
      style={{ left: box.x, top: box.y, width: box.size, height: box.size }}
      aria-hidden="true"
    >
      <b className={styles.badge}>{number}</b>
      {hold && <span className={styles.holdTag}>3 с</span>}
    </div>
  );
}
