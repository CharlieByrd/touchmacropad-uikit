import { Text } from "@chakra-ui/react";
import clsx from "clsx";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";

import { useGridMapper } from "../../hooks/useGridMapper/useGridMapper";
import { GridData, GridItem } from "../../types/grid.type";
import { Grid } from "../Grid/Grid";
import { Macros } from "../Macros/Macros";
import { MacrosProps } from "../Macros/type";
import { WidgetWrapper } from "../WidgetWrapper/WidgetWraper";

import style from "./Composer.module.css";
import { ComposerItem } from "./components/ComposerItem/ComposerItem";

import type { ComposerProps } from "./type";

export const Composer = ({
  gridConfig,
  initialGridData,
  isEditMode,
  onGridChange,
  onError,
}: ComposerProps) => {
  const [gridData, setGridData] = useState<GridData>(initialGridData);

  const { grid, gridWarn, getEditControls } = useGridMapper({
    gridConfig,
    gridData,
  });

  useEffect(() => {
    onGridChange?.(gridData);
  }, [gridData, onGridChange]);

  useEffect(() => {
    onError?.(gridWarn);
  }, [onError, gridWarn]);

  const getWidget = useCallback((gridItem: GridItem) => {
    if (!gridItem?.widget) {
      return null;
    }

    switch (gridItem.widget) {
      case "macros":
        return (
          <Macros
            extraProps={gridItem.widgetParams as MacrosProps["extraProps"]}
          />
        );
      case "widgetWrapper":
        return null;
      default:
        return null;
    }
  }, []);

  const gridComponents = useMemo(() => {
    const gridItems = gridData.map((item, index) => {
      return isEditMode ? (
        <ComposerItem
          key={`grid_item_key_${index}`}
          item={item}
          grid={grid}
          index={index}
          setGridData={setGridData}
          getEditControls={getEditControls}
          children={getWidget(item)}
        />
      ) : (
        <WidgetWrapper
          key={`grid_item_key_${index}`}
          startColumn={item.startColumn}
          startRow={item.startRow}
          columnSize={item.size.width}
          rowSize={item.size.height}
          color={item.color}
          children={getWidget(item)}
        />
      );
    });

    const emptyItems = isEditMode
      ? grid.reduce<ReactElement[]>((acc, currentValue, row) => {
          currentValue.forEach((item, column) => {
            if (item !== null) {
              return null;
            }

            acc.push(
              <WidgetWrapper
                className={style.composerPlaceholder}
                color="transparent"
                key={`composer_placeholder_${row}_${column}`}
                startRow={row + 1}
                startColumn={column + 1}
                data-droppable={true}
              />,
            );
          });

          return acc;
        }, [])
      : [];

    return [...gridItems, ...emptyItems];
  }, [gridData, isEditMode, grid, getEditControls, getWidget]);

  return (
    <div>
      {gridWarn && <Text color="fg.error">Error: wrong item placement</Text>}
      <Grid
        rows={gridConfig.rows}
        columns={gridConfig.columns}
        className={clsx({ [style.warnGrid]: gridWarn })}
      >
        {gridComponents}
      </Grid>
    </div>
  );
};
