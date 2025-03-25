import styles from "./Grid.module.css";
import { GridProps } from "./type";

export const Grid = (props: GridProps) => {
  const { rows = 3, columns = 5 } = props;

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateRows: `repeat(${rows}, 120px)`,
        gridTemplateColumns: `repeat(${columns}, 120px)`,
      }}
      {...props}
    />
  );
};
