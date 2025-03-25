import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import React from "react";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <ChakraProvider value={defaultSystem}>
          <Story />
        </ChakraProvider>
      );
    },
    withThemeByClassName({
      defaultTheme: "light",
      themes: { light: "", dark: "dark" },
    }),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
