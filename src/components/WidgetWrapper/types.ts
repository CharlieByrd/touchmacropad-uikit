import { HTMLAttributes } from "react";

export interface WidgetWrapperProps extends HTMLAttributes<HTMLDivElement> {
    startRow?: number;
    startColumn?: number;
    columnSize?: number;
    rowSize?: number;
    color?: string;
}
