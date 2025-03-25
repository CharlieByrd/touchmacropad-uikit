import clsx from "clsx";

import style from "./Grid.module.css";
import { GridProps } from "./type";

export const Grid = (props: GridProps) => {
  const { rows = 3, columns = 5, className, ...restProps } = props;

  return (
    <div
      className={clsx(style.grid, className)}
      style={{
        gridTemplateRows: `repeat(${rows}, 120px)`,
        gridTemplateColumns: `repeat(${columns}, 120px)`,
      }}
      {...restProps}
    />
  );
};
