// Storybook for the PNN components. Reuses vite.config.js (React plugin) and serves public/ like the site does.
export default {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public']
};
