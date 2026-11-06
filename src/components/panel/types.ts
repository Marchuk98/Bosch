import type { Dispatch } from "react";
import type { WasherAction, WasherState } from "@/lib/washer";
import type { TipContent } from "../Tooltip";

export type InfoHandler = (anchor: Element, content: TipContent) => void;

export type PanelProps = {
  state: WasherState;
  dispatch: Dispatch<WasherAction>;
  onInfo: InfoHandler;
};
