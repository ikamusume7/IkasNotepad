import type { DefaultTheme } from "vitepress";
import fs from "fs";
import path from "path";
import process from "process";

export const sidebar: DefaultTheme.Sidebar = {
  "/frontend/": [
    {
      text: "前言",
      link: "/frontend/",
    },
    {
      text: "Vue",
      items: searchFiles("/frontend/vue"),
    },
  ],
  "/gamedev/": [
    {
      text: "前言",
      link: "/gamedev/",
    },
  ],
  "/chat/": [
    {
      text: "前言",
      link: "/chat/",
    },
  ],
  "/misc/": [
    {
      text: "工具合集",
      items: searchFiles("/misc/tools"),
    },
    {
      text: "Bug合集",
      items: searchFiles("/misc/bugs"),
    },
  ],
};

function searchFiles(searchPath: string): DefaultTheme.SidebarItem[] {
  const absolutePath = process.cwd() + "/pages" + searchPath;
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
