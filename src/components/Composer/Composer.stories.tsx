import { CheckboxCheckedChangeDetails, Switch } from "@chakra-ui/react";
import { useState } from "react";

import discord from "../../mocks/assets/icons8-discord-512.png";
import { TouchContextProvider } from "../TouchContext/TouchContext";

import { Composer } from "./Composer";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Composer> = {
  args: {
    gridConfig: {
      columns: 5,
      rows: 4,
    },
    initialGridData: [
      {
        startColumn: 1,
        startRow: 1,
        size: {
          width: 1,
          height: 2,
        },
        color: "black",
        widget: "widgetWrapper",
        widgetParams: [],
      },
      {
        startColumn: 4,
        startRow: 1,
        size: {
          width: 1,
          height: 1,
        },
        color: "orange",
        widget: "macros",
        widgetParams: {
          imageHref: discord,
          title: undefined,
        },
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Composer>;

export const Primary: Story = {
  render: ({ ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isEditMode, setIsEditMode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isError, setIsError] = useState(false);

    const handleCheck = (details: CheckboxCheckedChangeDetails) => {
      if (isError) {
        return;
      }

      setIsEditMode(details.checked as boolean);
    };

    return (
      <>
        <Switch.Root
          checked={isEditMode}
          onCheckedChange={handleCheck}
          colorPalette="red"
          marginBottom="2rem"
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>edit mode</Switch.Label>
        </Switch.Root>
        <TouchContextProvider
          value={{
            handlers: {
              onWidgetEvent: (type, params) => {
                if (isEditMode) {
                  return;
                }

                console.log(`Macros called ${type}: ${JSON.stringify(params)}`);
              },
            },
          }}
        >
          <Composer isEditMode={isEditMode} onError={setIsError} {...props} />
        </TouchContextProvider>
      </>
    );
  },
  args: {
    initialGridData: [
      {
        startColumn: 1,
        startRow: 1,

        size: {
          width: 1,
          height: 2,
        },

        color: "black",
        widget: "widgetWrapper",
        widgetParams: [],
      },
      {
        startColumn: 2,
        startRow: 2,

        size: {
          width: 1,
          height: 1,
        },

        color: "blue",
        widget: "widgetWrapper",
        widgetParams: [],
      },
      {
        startColumn: 1,
        startRow: 3,

        size: {
          width: 2,
          height: 1,
        },

        color: "blue",
        widget: "widgetWrapper",
        widgetParams: [],
      },
      {
        startColumn: 1,
        startRow: 4,

        size: {
          width: 1,
          height: 1,
        },

        color: "blue",
        widget: "widgetWrapper",
        widgetParams: [],
      },
      {
        startColumn: 4,
        startRow: 1,

        size: {
          width: 1,
          height: 1,
        },

        color: "orange",
        widget: "macros",

        widgetParams: {
          imageHref: "/src/mocks/assets/icons8-discord-512.png",
          keys: ["cntrl", "alt", "delete"],
        },
      },
    ],

    gridConfig: {
      columns: 7,
      rows: 4,
    },
  },
};
