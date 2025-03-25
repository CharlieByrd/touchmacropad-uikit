
import { ComponentProps, ComponentType } from "react";
import { widgetMap } from "../constants/widgetMap";

export interface WidgetType<I extends ComponentType> {
  component: I;
  props: ComponentProps<I>;
}

export interface GridItem {
  startRow: number;
  startColumn: number;
  size: {
    width: number;
    height: number;
  };
  widget?: keyof typeof widgetMap;
  color?: string;
}

export type GridData = GridItem[];
