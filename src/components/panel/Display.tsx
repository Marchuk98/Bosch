"use client";

import clsx from "clsx";
import { BOTTOM_BUTTONS, STAINS, TOP_LEFT_BUTTONS, TOP_RIGHT_BUTTONS, type PanelButton } from "@/lib/data";
import { TIPS, buttonTip, stainTip, stainsTip } from "@/lib/tips";
import { readouts } from "@/lib/washer";
import type { TipContent } from "../Tooltip";
import { Icon } from "../Icon";
import type { PanelProps } from "./types";
import styles from "./Panel.module.css";

function ControlButton({ button, state, dispatch, onInfo }: PanelProps & { button: PanelButton }) {
  const dimmed = button.extra && !state.optionsOpen;
  const on = !!state.toggles[button.id];
  return (
    <button
      type="button"
      className={clsx(styles.control, dimmed && styles.dimmed, on && styles.on)}
      data-target={`btn:${button.id}`}
      data-tip-anchor=""
      aria-pressed={button.toggle ? on : undefined}
      onClick={(e) => {
        if (button.extra && !state.optionsOpen) dispatch({ type: "openOptions" });
        if (button.toggle) dispatch({ type: "toggle", id: button.id });
        onInfo(e.currentTarget, buttonTip(button));
      }}
    >
      <Icon name={button.icon} className={styles.controlIcon} />
      <span className={styles.de}>{button.de}</span>
      <span className={styles.ru}>{button.ru.join(" ")}</span>
    </button>
  );
}

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 40 20" className={styles.chevron} aria-hidden="true">
      <path d={up ? "M4 16 20 4l16 12" : "M4 4l16 12L36 4"} />
    </svg>
  );
}

type ReadoutProps = {
  name: "temp" | "spin" | "time";
  label: string;
  value: { value: string; small: boolean };
  unit?: React.ReactNode;
  tip: TipContent;
  onStep: (delta: 1 | -1) => void;
  onInfo: PanelProps["onInfo"];
};

function Readout({ name, label, value, unit, tip, onStep, onInfo }: ReadoutProps) {
  return (
    <div className={styles.readout}>
      <button type="button" className={styles.step} data-target={`${name}-up`} data-tip-anchor=""
        aria-label={`${label}: больше`} onClick={(e) => { onStep(1); onInfo(e.currentTarget.nextElementSibling!, tip); }}>
        <Chevron up />
      </button>
      <button type="button" className={styles.value} data-tip-anchor="" aria-label={label}
        onClick={(e) => onInfo(e.currentTarget, tip)}>
        <span className={clsx(styles.digits, value.small && styles.digitsSmall)}>{value.value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </button>
      <button type="button" className={styles.step} data-tip-anchor="" aria-label={`${label}: меньше`}
        onClick={(e) => { onStep(-1); onInfo(e.currentTarget.previousElementSibling!, tip); }}>
        <Chevron />
      </button>
    </div>
  );
}

export function Display(props: PanelProps) {
  const { state, dispatch, onInfo } = props;
  const r = readouts(state);

  return (
    <div className={styles.display}>
      <button
        type="button"
        className={clsx(styles.pill, styles.areaOptions, state.optionsOpen && styles.pillActive)}
        data-target="options"
        data-tip-anchor=""
        aria-pressed={state.optionsOpen}
        onClick={(e) => { dispatch({ type: "toggleOptions" }); onInfo(e.currentTarget, TIPS.options); }}
      >
        <span className={styles.de}>Optionen</span>
        <span className={styles.ru}>Опции</span>
      </button>

      <div className={clsx(styles.buttonRow, styles.areaTop)}>
        <div className={styles.group}>
          {TOP_LEFT_BUTTONS.map((b) => <ControlButton key={b.id} button={b} {...props} />)}
        </div>
        <div className={styles.group}>
          {TOP_RIGHT_BUTTONS.map((b) => <ControlButton key={b.id} button={b} {...props} />)}
        </div>
      </div>

      <ul className={clsx(styles.stains, styles.areaStains)} aria-label="Типы пятен">
        {STAINS.map((s, i) => (
          <li key={s.de}>
            <button
              type="button"
              className={clsx(styles.stain, state.stain === i && styles.stainCurrent)}
              data-target={`stain:${i}`}
              data-tip-anchor=""
              aria-pressed={state.stain === i}
              onClick={(e) => { dispatch({ type: "setStain", index: i }); onInfo(e.currentTarget, stainTip(i)); }}
            >
              <Icon name={s.icon} className={styles.stainIcon} />
              <span className={styles.labels}>
                <span className={styles.de}>{s.de}</span>
                <span className={styles.ru}>{s.ru}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className={clsx(styles.readouts, styles.areaReadouts)}>
        <Readout name="temp" label="Температура" value={r.temp} unit="°C" tip={TIPS.temp} onInfo={onInfo}
          onStep={(delta) => dispatch({ type: "temp", delta })} />
        <Readout name="spin" label="Отжим" value={r.spin} unit={<Icon name="spin" size="1em" />} tip={TIPS.spin} onInfo={onInfo}
          onStep={(delta) => dispatch({ type: "spin", delta })} />
        <Readout name="time" label="Время" value={r.time} tip={TIPS.time} onInfo={onInfo}
          onStep={(delta) => dispatch({ type: "finishIn", delta })} />
        <span className={clsx(styles.wifi, state.toggles.remote && styles.wifiOn)} aria-hidden="true">
          <Icon name="wifi" size="100%" strokeWidth={1.5} />
        </span>
        <button
          type="button"
          className={clsx(styles.start, state.running && styles.startRunning)}
          data-target="start"
          data-tip-anchor=""
          aria-pressed={state.running}
          onClick={(e) => { dispatch({ type: "toggleRun" }); onInfo(e.currentTarget, TIPS.start); }}
        >
          <Icon name="playPause" className={styles.startIcon} strokeWidth={1.2} />
          <span className={styles.labels}>
            <span className={styles.de}>Start/Pause</span>
            <span className={styles.ru}>старт / пауза</span>
          </span>
        </button>
      </div>

      <button
        type="button"
        className={clsx(styles.pill, styles.pillRed, styles.areaFlecken)}
        data-target="stains"
        data-tip-anchor=""
        onClick={(e) => {
          const next = state.stain >= STAINS.length - 1 ? -1 : state.stain + 1;
          dispatch({ type: "cycleStain" });
          onInfo(e.currentTarget, stainsTip(next));
        }}
      >
        <span className={styles.de}>Flecken</span>
        <span className={styles.ru}>Пятна</span>
      </button>

      <div className={clsx(styles.buttonRow, styles.areaBottom)}>
        {BOTTOM_BUTTONS.map((b) => <ControlButton key={b.id} button={b} {...props} />)}
      </div>
    </div>
  );
}
