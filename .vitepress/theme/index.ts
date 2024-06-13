// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick } from "vue";
import type { Theme } from "vitepress";
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import "overlayscrollbars/overlayscrollbars.css";
import "vitepress-markdown-timeline/dist/theme/index.css";
import "@shikijs/vitepress-twoslash/style.css";
import "vitepress-plugin-sandpack/dist/style.css";
import "vitepress-plugin-codeblocks-fold/style/index.css";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
import "aplayer/dist/APlayer.min.css";
import "virtual:uno.css";
import "./custom.css";

import Layout from "./Layout.vue";

import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";

import { OverlayScrollbars } from "overlayscrollbars";

import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";

import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

import { Sandbox } from "vitepress-plugin-sandpack";

import codeblocksFold from "vitepress-plugin-codeblocks-fold";

import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";

import type { Options } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { InjectionKey as readabilityKey } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { InjectionKey as changelogKey } from "@nolebase/vitepress-plugin-git-changelog/client";
import {
  NolebasePagePropertiesEditor,
  InjectionKey as propertiesKey,
} from "@nolebase/vitepress-plugin-page-properties/client";

import mediumZoom from "medium-zoom";

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseInlineLinkPreviewPlugin);
    app.use(TwoslashFloatingVue);
    enhanceAppWithTabs(app);
    app.component("Sandbox", Sandbox);
    app.use(NolebaseGitChangelogPlugin);
    app.component("NolebasePagePropertiesEditor", NolebasePagePropertiesEditor);

    app.provide(readabilityKey, {
      layoutSwitch: {
        defaultMode: 4,
      },
      spotlight: { defaultToggle: true, defaultStyle: 2 },
    } as Options);
    app.provide(changelogKey, {
      mapAuthors: [
        {
          name: "ikamusume7",
          username: "ikamusume7",
          links: [{ type: "github", link: "https://github.com/ikamusume7" }],
        },
      ],
    });
    app.provide(propertiesKey, {
      properties: {
        "zh-CN": [
          {
            key: "createAt",
            type: "datetime",
            title: "创建时间",
            formatAsFrom: true,
            dateFnsLocaleName: "zhCN",
          },
        ],
      },
    });
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
      OverlayScrollbars(document.body, {
        // scrollbars: { theme: "os-theme-dark" },
      });

      // get frontmatter and route
      const { frontmatter } = useData();
      const route = useRoute();
      // basic use
      codeblocksFold({ route, frontmatter }, false, 400);
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
} satisfies Theme;
