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

import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";

import AutoNav from "vite-plugin-vitepress-auto-nav";
import VitePressPluginAutoNavSidebar from "vitepress-plugin-auto-nav-sidebar";

import UnoCSS from "unocss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "伊卡的记事本",
  titleTemplate: ":title - 伊卡的记事本",
  description: "Ika's Notepad",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: "./pages",
  // lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", items: [{ text: "Vue", link: "前端/Vue/Vue学习笔记" }] },
      { text: "关于", link: "/about" },
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
    footer: {
      message:
        'This site is licensed under the <a rel="license" href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>. Favicon by <a href="https://icons8.com target="_blank"" >Icons8<a>',
      copyright:
        'Copyright © 2024-present <a href="https://github.com/ikamusume7" target="_blank">Ika</a>',
    },
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
      md.use(BiDirectionalLinks({ dir: "pages" }));
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
      UnoCSS(),
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

