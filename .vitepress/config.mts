import { defineConfig } from "vitepress";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import timeline from "vitepress-markdown-timeline";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "伊卡的笔记仓库",
  titleTemplate: ":title - 伊卡的笔记仓库",
  description: "My notes collection",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: "./pages",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md) {
      // 其他 markdown-it 配置...
      // @ts-expect-error unmatched type for VitePress, ref https://github.com/nolebase/integrations/pull/228 [!code ++]
      md.use(InlineLinkPreviewElementTransform);
      md.use(timeline);
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
      ],
    },
  },
});

