import { GridProps } from "../../components/Grid/type";
import { WidgetWrapperEditControls } from "../../components/WidgetWrapper/types";
import { GridData } from "../../types/grid.type";

export interface UseGridMapperParams {
  gridConfig: GridProps;
  gridData: GridData;
}

export interface UseGridMapperReturn {
  grid: (number | null)[][];
  gridWarn: boolean;
  getEditControls: (index: number) => WidgetWrapperEditControls;
}
