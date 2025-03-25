import { widgetMap } from "../constants/widgetMap";

export interface BaseWidgetProps
  extends Record<keyof typeof widgetMap, unknown> {
  widgetWrapper: [];
  macros: { imageHref: string; title?: string; keys?: string[] };
}

export interface WidgetContextEventMap
  extends Record<keyof typeof widgetMap, unknown> {
  widgetWrapper: null;
  macros: string[];
}

export interface WidgetProps<I extends keyof typeof widgetMap> {
  extraProps: BaseWidgetProps[I];
}
