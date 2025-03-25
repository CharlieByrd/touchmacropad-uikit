import { useCallback, useMemo, useState } from "react";
import { UseGridMapperParams, UseGridMapperReturn } from "./type";

export const useGridMapper = ({
  gridConfig,
  gridData,
}: UseGridMapperParams): UseGridMapperReturn => {
  const [gridWarn, setGrigWarn] = useState(false);

  const grid = useMemo(() => {
    const emptyGrid = Array.from(Array(gridConfig.rows ?? 3)).map(() =>
      Array.from(Array(gridConfig.columns ?? 5))
    );

    gridData.forEach((data, i) => {
      if (emptyGrid[data.startRow - 1][data.startColumn - 1] !== undefined) {
        console.warn(
          "Invalid startRow/startColumn property, grid can be broken",
          data
        );
        setGrigWarn(true);
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
            if (emptyGrid[r][c] !== undefined) {
              console.warn(
                `Invalid block positiom row:${r} column:${c}, grid will work unexpected`
              );
              setGrigWarn(true);
            } else {
              emptyGrid[r][c] = i;
            }
          }
        }
      }
    });

    return emptyGrid;
  }, [gridConfig, gridData]);

  console.log(grid)
  const growItem = useCallback((i: number, growType: "widht" | "height") => {
    if (growType === "height") {
      if (gridData[i]) {
        gridData[i].size.height += 1;
      }
    }
  }, gridData);

  const shrinkItem = useCallback((i: number, growType: "width" | "height") => {
    if (gridData[i]) {
      gridData[i].size[growType] -= 1;
    }
  }, gridData);

  return { grid, gridWarn };
};
