import { HTMLAttributes } from "react";

export type WidgetWrapperEditControls = [
  right: [grow: boolean, shrink: boolean],
  bottom: [grow: boolean, shrink: boolean],
];
export interface WidgetWrapperProps extends HTMLAttributes<HTMLDivElement> {
  startRow?: number;
  startColumn?: number;
  columnSize?: number;
  rowSize?: number;
  color?: string;
  editControls?: WidgetWrapperEditControls;
  onWidgetResize?: (
    type: "grow" | "shrink",
    direction: "right" | "down",
  ) => void;
}
