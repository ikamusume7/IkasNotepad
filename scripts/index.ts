// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from "vue";
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
import "./styles/style.css";

import Layout from "./components/Layout.vue";

import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";

import { OverlayScrollbars } from "overlayscrollbars";

import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";

import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

import { Sandbox } from "vitepress-plugin-sandpack";

import codeblocksFold from "vitepress-plugin-codeblocks-fold";

import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";

import type { Options } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { InjectionKey } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

export default {
  extends: DefaultTheme,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //     // 为较宽的屏幕的导航栏添加阅读增强菜单
  //     "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
  //     // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
  //     "nav-screen-content-after": () =>
  //       h(NolebaseEnhancedReadabilitiesScreenMenu),
  //     "layout-top": () => h(NolebaseHighlightTargetedHeading),
  //   });
  // },
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(NolebaseInlineLinkPreviewPlugin);
    app.use(TwoslashFloatingVue);
    enhanceAppWithTabs(app);
    app.component("Sandbox", Sandbox);
    app.use(NolebaseGitChangelogPlugin);

    // const { isMobile } = useDeviceType();

    // app.provide("isMobile", isMobile);
    app.provide(InjectionKey, {
      layoutSwitch: {
        defaultMode: 4,
      },
      spotlight: { defaultToggle: true, defaultStyle: 2 },
    } as Options);
  },
  setup() {
    onMounted(() => {
      OverlayScrollbars(document.body, {
        // scrollbars: { theme: "os-theme-dark" },
      });

      // get frontmatter and route
      const { frontmatter } = useData();
      const route = useRoute();
      // basic use
      codeblocksFold({ route, frontmatter }, false, 400);
    });
  },
} satisfies Theme;

