import { IconButton } from "@chakra-ui/react";
import clsx from "clsx";
import {
  Dispatch,
  MouseEvent as RMouseEvent,
  SetStateAction,
  TouchEvent as RTouchEvent,
  useCallback,
  useMemo,
} from "react";

import { GridItem } from "../../../../types/grid.type";
import { WidgetWrapper } from "../../../WidgetWrapper/WidgetWraper";
import {
  WidgetWrapperEditControls,
  WidgetWrapperProps,
} from "../../../WidgetWrapper/types";
import style from "../../Composer.module.css";

export const ComposerItem = ({
  item,
  index,
  setGridData,
  getEditControls,
  children,
}: {
  item: GridItem;
  index: number;
  setGridData: Dispatch<SetStateAction<GridItem[]>>;
  grid: (number | null)[][];
  getEditControls: (index: number) => WidgetWrapperEditControls;
  children?: React.ReactNode;
}) => {
  const onMouseDown = (event: RMouseEvent | RTouchEvent) => {
    const target = event.currentTarget as HTMLElement;
    target.classList.add(style.controlFocused);

    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      let toElement = event.target as HTMLElement;

      if (event.type === "touchmove") {
        const touchEvent = event as TouchEvent;

        const node = document.elementFromPoint(
          touchEvent.changedTouches[0].clientX,
          touchEvent.changedTouches[0].clientY
        );

        if (node) {
          toElement = node as HTMLElement;
        }
      }

      if (toElement.dataset["droppable"] === "true") {
        setGridData((gridData) => {
          const newData = structuredClone(gridData);

          if (toElement.dataset["column"]) {
            newData[index].startColumn = parseInt(toElement.dataset["column"]);
          }

          if (toElement.dataset["row"]) {
            newData[index].startRow = parseInt(toElement.dataset["row"]);
          }

          return newData;
        });
      }
    };

    const onMouseUp = () => {
      target.classList.remove(style.controlFocused);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };

    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("touchmove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
  };

  const handleWidgetResize = useCallback(
    (type: "grow" | "shrink", direction: "down" | "right") => {
      if (direction === "down") {
        setGridData((gridData) => {
          const newData = structuredClone(gridData);

          newData[index].size.height += type === "grow" ? 1 : -1;

          return newData;
        });
      }

      if (direction === "right") {
        setGridData((gridData) => {
          const newData = structuredClone(gridData);

          newData[index].size.width += type === "grow" ? 1 : -1;

          return newData;
        });
      }
    },
    [setGridData, index]
  );

  const editControls = useMemo(() => {
    return getEditControls(index)?.map(([grow, shrink], i) => {
      if (!grow && !shrink) {
        return null;
      }

      const handleResizeCall =
        (type: Parameters<Required<WidgetWrapperProps>["onWidgetResize"]>[0]) =>
        () => {
          handleWidgetResize?.(type, i === 0 ? "right" : "down");
        };

      return (
        <div
          key={`wrapper_edit_control_${item.startColumn}_${item.startColumn}_${i}}`}
          className={clsx(style.control, {
            [style.growRight]: i === 0,
            [style.growBottom]: i === 1,
          })}
        >
          {grow && (
            <IconButton onClick={handleResizeCall("grow")}>+</IconButton>
          )}
          {shrink && (
            <IconButton onClick={handleResizeCall("shrink")}>-</IconButton>
          )}
        </div>
      );
    });
  }, [getEditControls, handleWidgetResize, index, item.startColumn]);

  return (
    <WidgetWrapper
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      color={item.color}
      rowSize={item.size.height}
      columnSize={item.size.width}
      startColumn={item.startColumn}
      startRow={item.startRow}
    >
      {editControls}
      <>{children}</>
    </WidgetWrapper>
  );
};
