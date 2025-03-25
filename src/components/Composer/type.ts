import { GridData } from "../../types/grid.type";
import { GridProps } from "../Grid/type";

export interface ComposerProps {
  gridConfig: GridProps;
  initialGridData: GridData;
  isEditMode?: boolean;
  onError?: (isError: boolean) => void;
  onGridChange?: (data: GridData) => void;
}
