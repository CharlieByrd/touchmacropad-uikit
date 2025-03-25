import { useCallback, useMemo, useState } from "react";

import { WidgetWrapperEditControls } from "../../components/WidgetWrapper/types";

import { UseGridMapperParams, UseGridMapperReturn } from "./type";

export const useGridMapper = ({
  gridConfig,
  gridData,
}: UseGridMapperParams): UseGridMapperReturn => {
  const [gridWarn, setGrigWarn] = useState(false);

  const grid = useMemo(() => {
    let warn = false;
    const emptyGrid: (number | null)[][] = Array.from(
      Array(gridConfig.rows ?? 3),
    ).map(() => Array.from(Array(gridConfig.columns ?? 5)).map(() => null));

    gridData.forEach((data, i) => {
      if (emptyGrid[data.startRow - 1][data.startColumn - 1] !== null) {
        console.warn(
          "Invalid startRow/startColumn property, grid can be broken",
          data,
        );
        warn = true;
      }

      if (data.size?.height || data.size?.width) {
        for (
          let r = data.startRow - 1;
          r < data.startRow + (data.size.height ?? 1) - 1;
          r++
        ) {
          for (
            let c = data.startColumn - 1;
            c < data.startColumn + (data.size.width ?? 1) - 1;
            c++
          ) {
            if (emptyGrid[r]?.[c] !== null) {
              console.warn(
                `Invalid block positiom row:${r} column:${c}, grid will work unexpected`,
              );
              warn = true;
            } else {
              if (emptyGrid[r] === null) {
                console.warn(
                  `Invalid block positiom row:${r} column:${c}, grid will work unexpected`,
                );
                warn = true;

                continue;
              }

              emptyGrid[r][c] = i;
            }
          }
        }
      }
    });

    setGrigWarn(warn);

    return emptyGrid;
  }, [gridConfig, gridData]);

  const getEditControls = useCallback(
    (index: number): WidgetWrapperEditControls => {
      if (!gridData || !gridData[index]) throw new Error("Invalid Grid Item");

      const item = gridData[index];
      const right: [canGrow: boolean, canShrink: boolean] = [true, true];

      if (item.size.width <= 1) {
        right[1] = false;
      }

      if (item.startColumn + item.size.width > (gridConfig.columns ?? 5)) {
        right[0] = false;
      } else {
        for (
          let i = item.startRow - 1;
          i < item.startRow + item.size.height - 1;
          i++
        ) {
          if (grid[i]?.[item.size.width + item.startColumn - 1] !== null) {
            right[0] = false;
            break;
          }
        }
      }

      const bottom: [canGrow: boolean, canShrink: boolean] = [true, true];

      if (item.size.height <= 1) {
        bottom[1] = false;
      }

      if (item.startRow + item.size.height > (gridConfig.rows ?? 4)) {
        bottom[0] = false;
      } else {
        for (
          let i = item.startColumn - 1;
          i < item.startColumn + item.size.width - 1;
          i++
        ) {
          if (grid[item.size.height + item.startRow - 1][i] !== null) {
            bottom[0] = false;
            break;
          }
        }
      }

      return [right, bottom];
    },
    [grid, gridConfig.columns, gridConfig.rows, gridData],
  );

  return { getEditControls, grid, gridWarn };
};
