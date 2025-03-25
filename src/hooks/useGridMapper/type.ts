
import { GridProps } from "../../components/Grid/type";
import { GridData } from "../../types/grid.type";

export interface UseGridMapperParams {
  gridConfig: GridProps;
  gridData: GridData;
};

export interface UseGridMapperReturn {
    grid: number[][];
    gridWarn: boolean;
}

