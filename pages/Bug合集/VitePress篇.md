---
tag:
  - Vitepress
  - Meting
  - APlayer
---

# 建立 Vitepress 网站过程中遇到的 Bug

## Meting.js

::: warning
控制台出现 “Failed to resolve component: meting-js” 的警告
:::

解决方法：使用 Vue 的[`<component>`](https://cn.vuejs.org/api/built-in-special-elements.html#component)

```vue
<component
  is="meting-js"
  server="netease"
  type="playlist"
  id="6806979872"
  mini="true"
  order="random"
/>
```

::: danger
控制台出现 “Hydration completed but contains mismatches.” 的错误，并且有两个 aplyer 播放器
:::

解决方法：使用[`<ClientOnly>`](https://vitepress.dev/zh/guide/ssr-compat#clientonly)

```vue
<ClientOnly>
<component
  is="meting-js"
  server="netease"
  type="playlist"
  id="6806979872"
  mini="true"
  order="random"
/>
</ClientOnly>
```
