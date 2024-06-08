// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./styles/style.css";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import "overlayscrollbars/overlayscrollbars.css";
import "vitepress-markdown-timeline/dist/theme/index.css";
import "@shikijs/vitepress-twoslash/style.css";

import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";

// import MyLayout from "./components/Layout.vue";

import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";

import { OverlayScrollbars } from "overlayscrollbars";

import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      "nav-screen-content-after": () =>
        h(NolebaseEnhancedReadabilitiesScreenMenu),
      "layout-top": () => h(NolebaseHighlightTargetedHeading),
    });
  },
  // Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(NolebaseInlineLinkPreviewPlugin);
    app.use(TwoslashFloatingVue);
  },
  setup() {
    OverlayScrollbars(document.body, {
      // scrollbars: { theme: "os-theme-dark" },
    });
  },
} satisfies Theme;

