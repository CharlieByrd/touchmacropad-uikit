import { ChakraProvider, defaultSystem, Flex } from '@chakra-ui/react'
import type { Preview } from '@storybook/react'
import React from 'react';

const preview: Preview = {
  decorators: (Story) => {
    return <ChakraProvider value={defaultSystem}>
      <Story />
    </ChakraProvider>
  },
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;