import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { WidgetWrapper } from "../WidgetWrapper/WidgetWraper";
import { WidgetWrapperProps } from "../WidgetWrapper/types";
import { useGridMapper } from "../../hooks/useGridMapper/useGridMapper";

const meta: Meta<typeof Grid> = {
  //@ts-expect-error
  component: ({ rows, columns, items }) => {
    useGridMapper({
      gridConfig: { rows: 3, columns: 5 },
      gridData: [
        {
          startColumn: 1,
          startRow: 1,
          size: {
            height: 2,
            width: 2,
          },
        },
        {
          startColumn: 4,
          startRow: 1,
          size: {
            height: 3,
            width: 1,
          },
        },
      ],
    });

    return (
      <Grid rows={rows} columns={columns}>
        {Array.from(Array(items - 3)).map((_, i) => {
          const props: WidgetWrapperProps = (() => {
            if (i === 0) {
              return {
                startRow: 1,
                rowSize: 2,
                startColumn: 1,
                columnSize: 1,
              };
            }

            if (i === 2) {
              return {
                startColumn: 4,
                color: "red",
              };
            }

            if (i === 3) {
              return {
                color: "orange",
              };
            }

            if (i === 5) {
              return {
                startRow: 2,
                rowSize: 2,
                startColumn: 5,
                columnSize: 2,
                color: "pink",
              };
            }

            return {};
          })();

          return <WidgetWrapper key={`grid_item_${i}`} {...props} />;
        })}
      </Grid>
    );
  },
  args: {
    rows: 3,
    columns: 5,
    // @ts-expect-error
    items: 15,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Primary: Story = {};
