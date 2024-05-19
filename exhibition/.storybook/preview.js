import { withConsole } from '@storybook/addon-console';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
