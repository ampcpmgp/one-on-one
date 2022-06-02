module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  // https://github.com/eirslett/storybook-builder-vite/issues/52
  // core: {
  //   builder: "storybook-builder-vite",
  // },
};
