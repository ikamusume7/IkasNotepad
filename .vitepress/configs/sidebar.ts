import type { DefaultTheme } from "vitepress";
import fs from "fs";
import path from "path";
import process from "process";
import matter from "gray-matter";

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
  "/art/": [
    {
      text: "前言",
      link: "/art/",
    },
    {
      text: "人物姿势的定理",
      items: searchFiles("/art/人物姿势的定理"),
    },
  ],
  "/chat/": [
    {
      text: "前言",
      link: "/chat/",
    },
    {
      text: "游戏感想",
      items: searchFiles("/chat/game"),
    },
    {
      text: "生活",
      items: searchFiles("/chat/life"),
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
    if (file === "index.md" || file.endsWith(".md") === false) {
      return;
    }
    const fileContent = fs.readFileSync(absolutePath + "/" + file, "utf-8");
    const { data } = matter(fileContent);
    const index = data.index || 0;
    const name = path.parse(file).name;
    items.push({
      text: name,
      link: `${searchPath}/${name}`,
      index,
    });
  });
  items.sort((a, b) => a.index - b.index);
  return items;
}
