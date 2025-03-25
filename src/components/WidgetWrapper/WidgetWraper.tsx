import clsx from "clsx";
import { CSSProperties, useMemo } from "react";

import style from "./WidgetWrapper.module.css";
import { WidgetWrapperProps } from "./types";

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  const {
    startRow,
    startColumn,
    rowSize = 1,
    columnSize = 1,
    color = "--chakra-colors-purple-600",
    className,
    children,
    ...restProps
  } = props;

  const styleProp = useMemo<CSSProperties | undefined>(() => {
    const background = color.startsWith("--") ? `var(${color})` : color;

    if (!startRow && !startColumn) {
      console.warn("Position is unset");

      return {
        background,
      };
    }

    return {
      gridRow: startRow ? `${startRow}/${startRow + rowSize}` : undefined,
      gridColumn: startColumn
        ? `${startColumn}/${startColumn + columnSize}`
        : undefined,
      background,
    } as CSSProperties;
  }, [color, startRow, startColumn, rowSize, columnSize]);

  return (
    <div
      className={clsx(className, style.widgetWrapper)}
      style={styleProp}
      data-row={startRow}
      data-column={startColumn}
      {...restProps}
    >
      {children}
    </div>
  );
};
