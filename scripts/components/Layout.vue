<template>
  <Layout>
    <template #layout-top>
      <NolebaseHighlightTargetedHeading />
      <!-- <div id="aplayer"></div> -->
    </template>
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
      <ClientOnly>
        <meting-js
          server="netease"
          type="playlist"
          id="6806979872"
          mini="true"
          order="random"
        ></meting-js>
      </ClientOnly>
    </template>
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
    <template #doc-after>
      <div :key="title" class="giscus">
        <Giscus
          repo="ikamusume7/MyNotes"
          repoId="R_kgDOMGWs2w"
          category="Announcements"
          categoryId="DIC_kwDOMGWs284Cf8f_"
          mapping="title"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="!isDark ? 'light' : 'dark'"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </template>
    <template #layout-bottom> </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { nextTick, onMounted, provide } from "vue";

import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";

import Giscus from "@giscus/vue";

// 确保 Meting.js 只初始化一次
// onMounted(() => {
//   const script = document.createElement("script");
//   script.src = "https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js";
//   document.body.appendChild(script);
// });

const { Layout } = DefaultTheme;
const { title, isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
