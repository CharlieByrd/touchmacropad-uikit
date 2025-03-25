import clsx from "clsx";
import { WidgetWrapperProps } from "./types";
import { CSSProperties, useMemo } from "react";
import styles from "./WidgetWrapper.module.css";

export const WidgetWrapper = (props: WidgetWrapperProps) => {
  const {
    startRow,
    startColumn,
    rowSize = 1,
    columnSize = 1,
    color = "--chakra-colors-purple-600",
    className,
    ...restProps
  } = props;

  const style = useMemo<CSSProperties | undefined>(() => {
    const background = color.startsWith('--') ? `var(${color})` : color;

    if (!startRow && !startColumn) {
      console.warn("Position is unset");
      return {
        background
      };
    }

    return {
      gridRow: startRow ? `${startRow}/${startRow+rowSize}` : undefined,
      gridColumn: startColumn ? `${startColumn}/${startColumn +columnSize}` : undefined,
      background
    } as CSSProperties;
  }, []);

  return (
    <div
      className={clsx(className, styles.widgetWrapper)}
      style={style}
      {...restProps}
    />
  );
};
