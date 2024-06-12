import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "日志", link: "/records/时间线" },
  { text: "前端", items: [{ text: "Vue", link: "front-end/vue/Vue学习笔记" }] },
  {
    text: "游戏开发",
    link: "/game-dev/",
  },
  {
    text: "杂物",
    items: [
      { text: "工具合集", link: "misc/tools/VitePress插件介绍" },
      { text: "Bug合集", link: "misc/bugs/VitePress篇" },
    ],
  },
  {
    text: "杂谈",
    link: "/chat/",
  },
  { text: "关于", link: "/about" },
];
