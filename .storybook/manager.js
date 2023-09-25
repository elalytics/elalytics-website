// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light", // or 'dark'

    // Brand logo/text
    brandTitle: "Elalytics Developer Docs",
  }),
});
