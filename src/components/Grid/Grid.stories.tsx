import { WidgetWrapper } from "../WidgetWrapper/WidgetWraper";
import { WidgetWrapperProps } from "../WidgetWrapper/types";

import { Grid } from "./Grid";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Grid> = {
  component: ({ rows, columns, items }) => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    items: 15,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Primary: Story = {};
