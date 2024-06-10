// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|md|mdx?|astro|elm|php|phtml|html)($|\?)/,
        "*.ts",
      ],
    },
  },
});
