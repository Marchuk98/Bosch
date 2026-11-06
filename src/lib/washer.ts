import { PROGRAMS, SPINS, STAINS, TEMPS, type ButtonId, type Program, type ProgramId, programIndex } from "./data";

export type WasherState = {
  program: number;
  temp: number;
  spin: number;
  finishIn: number;
  toggles: Partial<Record<ButtonId, boolean>>;
  optionsOpen: boolean;
  stain: number;
  power: boolean;
  running: boolean;
};

export type WasherAction =
  | { type: "selectProgram"; index: number }
  | { type: "selectProgramById"; id: ProgramId }
  | { type: "temp"; delta: 1 | -1 }
  | { type: "setTempMax" }
  | { type: "spin"; delta: 1 | -1 }
  | { type: "finishIn"; delta: 1 | -1 }
  | { type: "toggle"; id: ButtonId }
  | { type: "openOptions" }
  | { type: "toggleOptions" }
  | { type: "cycleStain" }
  | { type: "setStain"; index: number }
  | { type: "togglePower" }
  | { type: "toggleRun" };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const maxTempIndex = (p: Program) => (typeof p.maxTemp === "number" ? TEMPS.indexOf(p.maxTemp as (typeof TEMPS)[number]) : 0);
const maxSpinIndex = (p: Program) => (p.maxSpin ? SPINS.indexOf(p.maxSpin as (typeof SPINS)[number]) : 0);

function programDefaults(index: number): Pick<WasherState, "program" | "temp" | "spin" | "running"> {
  const p = PROGRAMS[index]!;
  return {
    program: index,
    temp: p.defaultTemp ? TEMPS.indexOf(p.defaultTemp as (typeof TEMPS)[number]) : 0,
    spin: maxSpinIndex(p),
    running: false,
  };
}

export const initialWasherState: WasherState = {
  ...programDefaults(programIndex("cotton")),
  finishIn: 0,
  toggles: {},
  optionsOpen: false,
  stain: -1,
  power: true,
};

export function washerReducer(state: WasherState, action: WasherAction): WasherState {
  const program = PROGRAMS[state.program]!;
  switch (action.type) {
    case "selectProgram":
      return { ...state, ...programDefaults(action.index) };
    case "selectProgramById":
      return { ...state, ...programDefaults(programIndex(action.id)) };
    case "temp":
      if (typeof program.maxTemp !== "number") return state;
      return { ...state, temp: clamp(state.temp + action.delta, 0, maxTempIndex(program)) };
    case "setTempMax":
      if (typeof program.maxTemp !== "number") return state;
      return { ...state, temp: maxTempIndex(program) };
    case "spin":
      if (!program.maxSpin) return state;
      return { ...state, spin: clamp(state.spin + action.delta, -1, maxSpinIndex(program)) };
    case "finishIn":
      return { ...state, finishIn: clamp(state.finishIn + action.delta, 0, 24) };
    case "toggle":
      return { ...state, toggles: { ...state.toggles, [action.id]: !state.toggles[action.id] } };
    case "openOptions":
      return { ...state, optionsOpen: true };
    case "toggleOptions":
      return { ...state, optionsOpen: !state.optionsOpen };
    case "cycleStain":
      return { ...state, stain: state.stain >= STAINS.length - 1 ? -1 : state.stain + 1 };
    case "setStain":
      return { ...state, stain: action.index };
    case "togglePower":
      return { ...state, power: !state.power, running: false };
    case "toggleRun":
      return { ...state, running: !state.running };
  }
}

export function readouts(state: WasherState) {
  const p = PROGRAMS[state.program]!;
  const t = TEMPS[state.temp];
  const temp =
    p.maxTemp === "auto" ? { value: "40-60", small: true }
    : p.maxTemp === null ? { value: "--", small: false }
    : t === "kalt" ? { value: "kalt", small: true }
    : { value: String(t), small: false };
  const spin =
    p.maxSpin === null ? { value: "--", small: false }
    : state.spin < 0 ? { value: "Stop", small: true }
    : { value: String(SPINS[state.spin]), small: false };
  const time = state.finishIn ? { value: `${state.finishIn}h`, small: false } : { value: "-:--", small: false };
  return { temp, spin, time };
}
