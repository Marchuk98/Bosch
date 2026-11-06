"use client";

import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useEffect, useRef } from "react";
import styles from "./Tooltip.module.css";

export type TipContent = {
  title: string;
  subtitle?: string;
  text?: string;
  chips?: [label: string, value: string][];
  hold?: boolean;
};

export type TipState = { anchor: Element; content: TipContent; key: number } | null;

const AUTO_HIDE_MS = 5000;

export function Tooltip({ tip, onClose }: { tip: TipState; onClose: () => void }) {
  const arrowRef = useRef<SVGSVGElement>(null);
  const { refs, floatingStyles, context } = useFloating({
    open: !!tip,
    elements: { reference: tip?.anchor ?? null },
    placement: "bottom",
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip({ padding: 12 }), shift({ padding: 12 }), arrow({ element: arrowRef })],
  });

  useEffect(() => {
    if (!tip) return;
    const timer = window.setTimeout(onClose, AUTO_HIDE_MS);
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (el?.closest("[data-tip-anchor]") || refs.floating.current?.contains(el)) return;
      onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [tip, onClose, refs.floating]);

  if (!tip) return null;
  const { content } = tip;

  return (
    <FloatingPortal>
      <div
        key={tip.key}
        ref={refs.setFloating}
        style={floatingStyles}
        className={styles.tip}
        role="status"
        aria-live="polite"
      >
        <div className={styles.title}>{content.title}</div>
        {content.subtitle && <div className={styles.subtitle}>{content.subtitle}</div>}
        {content.text && <p className={styles.text}>{content.text}</p>}
        {content.chips && (
          <div className={styles.chips}>
            {content.chips.map(([label, value]) => (
              <span key={label} className={styles.chip}>
                <b>{value}</b> {label}
              </span>
            ))}
          </div>
        )}
        {content.hold && <span className={styles.hold}>держать 3 с</span>}
        <FloatingArrow ref={arrowRef} context={context} className={styles.arrow} width={14} height={7} />
      </div>
    </FloatingPortal>
  );
}
