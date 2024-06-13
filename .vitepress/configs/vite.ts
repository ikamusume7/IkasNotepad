import type { UserConfig } from "vitepress";

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from "@nolebase/vitepress-plugin-page-properties/vite";
import UnoCSS from "unocss/vite";

export const vite: UserConfig["vite"] = {
  plugins: [
    GitChangelog({
      // 填写在此处填写您的仓库链接
      repoURL: () => "https://github.com/ikamusume7/MyNotes",
    }),
    GitChangelogMarkdownSection({
      sections: {
        disableContributors: true,
      },
    }),
    PageProperties(),
    PagePropertiesMarkdownSection(),
    UnoCSS(),
  ],
  optimizeDeps: {
    exclude: [
      "@nolebase/vitepress-plugin-enhanced-readabilities/client",
      "@nolebase/vitepress-plugin-page-properties/client",
    ],
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
};
