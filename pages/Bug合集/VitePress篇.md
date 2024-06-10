---
tag:
  - Vitepress
  - Meting
  - APlayer
---

# 建立 Vitepress 博客过程中遇到的 Bug

## Meting.js

::: danger
控制台出现 “Hydration completed but contains mismatches.” 的错误，并且有两个 aplyer 播放器

:::

解决方法：使用`<ClientOnly>`

```vue
<ClientOnly>
  <meting-js
    server="netease"
    type="playlist"
    id="6806979872"
    mini="true"
    order="random"
  ></meting-js>
</ClientOnly>
```

::: warning
控制台出现 “Failed to resolve component: meting-js” 的警告
:::

解决方法：未解决
