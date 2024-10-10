import type { DefaultTheme } from "vitepress";
import fs from "fs";
import path from "path";
import process from "process";
import matter from "gray-matter";

export const sidebar: DefaultTheme.Sidebar = {
  "/gamedev/": [
    {
      text: "前言",
      link: "/gamedev/",
    },
    {
      text: "Unity",
      items: searchFiles("/gamedev/unity"),
    },
    {
      text: "Murder",
      items: searchFiles("/gamedev/murder"),
    },
  ],
  "/art/": [
    {
      text: "前言",
      link: "/art/",
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
