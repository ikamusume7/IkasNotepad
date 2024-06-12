import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "日志", link: "timeline" },
  {
    text: "前端",
    activeMatch: "^/frontend/",
    items: [
      {
        text: "Vue",
        link: "/frontend/vue/基础",
        activeMatch: "^/frontend/vue/",
      },
    ],
  },
  {
    text: "游戏开发",
    link: "/gamedev/",
  },
  {
    text: "杂物",
    activeMatch: "^/misc/",
    items: [
      {
        text: "工具合集",
        link: "/misc/tools/VitePress插件介绍",
        activeMatch: "^/misc/tools/",
      },
      {
        text: "Bug合集",
        link: "/misc/bugs/VitePress篇",
        activeMatch: "^/misc/bugs/",
      },
    ],
  },
  {
    text: "杂谈",
    link: "/chat/",
  },
  { text: "关于", link: "/about" },
];
