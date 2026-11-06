"use client";

import { useCallback, useEffect, useState, type Dispatch } from "react";
import { GUIDES } from "@/lib/guides";
import type { WasherAction } from "@/lib/washer";

const STEP_MS = 3200;

type Run = { guide: number; step: number };

export function useGuide(dispatch: Dispatch<WasherAction>) {
  const [run, setRun] = useState<Run | null>(null);
  const guide = run ? GUIDES[run.guide]! : null;
  const step = run && guide ? guide.steps[run.step]! : null;

  const move = useCallback((delta: 1 | -1) => {
    setRun((r) => {
      if (!r) return r;
      const n = GUIDES[r.guide]!.steps.length;
      return { ...r, step: (r.step + delta + n) % n };
    });
  }, []);

  const start = useCallback((index: number) => setRun({ guide: index, step: 0 }), []);
  const stop = useCallback(() => setRun(null), []);
  const next = useCallback(() => move(1), [move]);
  const prev = useCallback(() => move(-1), [move]);

  useEffect(() => {
    if (step?.effect) dispatch(step.effect);
  }, [step, dispatch]);

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(next, STEP_MS);
    return () => window.clearTimeout(t);
  }, [run, next]);

  return { run, guide, step, start, stop, next, prev };
}

export type GuideControls = ReturnType<typeof useGuide>;
