import { defineConfig } from "vitepress";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import timeline from "vitepress-markdown-timeline";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import {
  chineseSearchOptimize,
  pagefindPlugin,
} from "vitepress-plugin-pagefind";
import { PageProperties } from "@nolebase/vitepress-plugin-page-properties/vite";

import AutoNav from "vite-plugin-vitepress-auto-nav";
import VitePressPluginAutoNavSidebar from "vitepress-plugin-auto-nav-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "伊卡的笔记仓库",
  titleTemplate: ":title - 伊卡的笔记仓库",
  description: "My notes collection",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: "./pages",
  // lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", items: [{ text: "Vue", link: "前端/Vue/Vue学习笔记" }] },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ikamusume7/MyNotes" },
    ],
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md) {
      // 其他 markdown-it 配置...
      // @ts-expect-error unmatched type for VitePress, ref https://github.com/nolebase/integrations/pull/228 [!code ++]
      md.use(InlineLinkPreviewElementTransform);
      md.use(timeline);
      md.use(tabsMarkdownPlugin);
      md
        // the second parameter is html tag name
        .use(container, "sandbox", {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, "sandbox");
          },
        });
    },
  },
  vite: {
    plugins: [
      GitChangelog({
        // 填写在此处填写您的仓库链接
        repoURL: () => "https://github.com/ikamusume7/MyNotes",
      }),
      GitChangelogMarkdownSection(),
      PageProperties(),
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "搜索",
        placeholder: "搜索笔记",
        emptyText: "空空如也",
        heading: "共: {{searchResult}} 条结果",
        excludeSelector: ["img", "a.header-anchor"],
      }),
      AutoNav({
        // 自定义配置
        useArticleTitle: true,
      }),
      // VitePressPluginAutoNavSidebar({
      //   documentRootPath: "pages",
      //   ignoreIndexItems: true,
      //   // collapsed: true,
      //   useTitleFromFileHeading: true,
      // }),
    ],
    optimizeDeps: {
      exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
        "@nolebase/vitepress-plugin-inline-link-preview",
        "@nolebase/ui",
      ],
    },
  },
});

