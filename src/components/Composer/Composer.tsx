import { useGridMapper } from "../../hooks/useGridMapper/useGridMapper";
import { GridData } from "../../types/grid.type";
import { Grid } from "../Grid/Grid"
import { ComposerProps } from "./type";

export const Composer = ({ gridConfig }: ComposerProps) => {
    const gridData: GridData = [];

    const { grid, gridWarn } = useGridMapper({ gridConfig, gridData });

    return <Grid>
        
    </Grid>
}