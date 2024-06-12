import type { DefaultTheme } from "vitepress";
import fs from "fs";
import path from "path";
import process from "process";

export const sidebar: DefaultTheme.Sidebar = {
  "/front-end/": [
    {
      text: "前言",
      link: "/front-end/",
    },
    {
      text: "Vue",
      items: searchFiles("front-end/vue"),
    },
  ],
  "/game-dev/": [
    {
      text: "前言",
      link: "/game-dev/",
    },
  ],
  "/records/": searchFiles("records"),
  "/chat/": [
    {
      text: "前言",
      link: "/chat/",
    },
  ],
  "/misc/": [
    {
      text: "工具合集",
      items: searchFiles("misc/tools"),
    },
    {
      text: "Bug合集",
      items: searchFiles("misc/bugs"),
    },
  ],
};

function searchFiles(searchPath: string): DefaultTheme.SidebarItem[] {
  const absolutePath = process.cwd() + "/pages/" + searchPath;
  const files = fs.readdirSync(absolutePath);
  const items: DefaultTheme.SidebarItem[] = [];
  files.forEach((file: string) => {
    const name = path.parse(file).name;
    items.push({
      text: name,
      link: `${searchPath}/${name}`,
    });
  });
  return items;
}
