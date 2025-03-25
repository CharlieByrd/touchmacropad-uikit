import { createContext } from "react";

import { widgetMap } from "../../constants/widgetMap";
import { WidgetContextEventMap } from "../../types/widget.type";

export const defaultTouchContext: {
  handlers: {
    onWidgetEvent: <I extends keyof typeof widgetMap>(
      type: I,
      params: WidgetContextEventMap[I],
    ) => void;
  };
} = {
  handlers: {
    onWidgetEvent: (type, params) => console.log(`${type} no handler`, params),
  },
};

export const TouchContext = createContext(defaultTouchContext);

export const TouchContextProvider = TouchContext.Provider;
