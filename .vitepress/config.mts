import { defineConfig } from "vitepress";

import { nav, sidebar, markdown, vite } from "./configs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "伊卡的记事本",
  titleTemplate: ":title - 伊卡的记事本",
  description: "Ika's Notepad",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: "./pages",
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }],
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
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/文道黑玫瑰.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  ],
  transformHead: ({ assets }) => {
    const myFontFile = assets.find((file) =>
      /.*文道黑玫瑰\..*\.woff2/.test(file)
    );
    if (myFontFile) {
      return [
        [
          "link",
          {
            rel: "preload",
            href: myFontFile,
            as: "font",
            type: "font/woff2",
            crossOrigin: "anonymous",
          },
        ],
      ];
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: "/logo-light.png",
      dark: "/logo-dark.png",
      alt: "伊卡的记事本Logo",
    },
    siteTitle: false,
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/ikamusume7/MyNotes" },
    ],
    footer: {
      message:
        'Favicon by <a href="https://icons8.com" target="_blank">Icons8</a>.',
      copyright: "Copyright © 2024-present Ika",
    },
    editLink: {
      pattern: ({ filePath }) => {
        return `https://github.com/ikamusume7/IkasNotepad/blob/main/pages/${filePath}`;
      },
      text: "在 GitHub 上编辑此页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    outline: {
      level: "deep",
      label: "页面导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
  },
  markdown: markdown,
  vite: vite,
});
