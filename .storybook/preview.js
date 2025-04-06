// .storybook/preview.js
import React from 'react';
import { Providers } from '../src/app/providers';
import '../src/app/globals.css'; // Make sure you're importing your global CSS

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Providers>
      <Story />
    </Providers>
  ),
];