import { HTMLAttributes } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  rows?: number;
  className?: string;
}
