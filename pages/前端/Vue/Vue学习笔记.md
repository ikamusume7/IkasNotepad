---
tag:
  - Vue
---

# Vue 学习笔记

## 语法

### 语法速览

- 双大括号
- v-html
- v-bind 或 :
- v-for
- v-if v-else-if v-else
- v-show
- v-on 或 @
- v-model
- ref()
- reactive()
- computed()
- watch()
- onMounted()

---

## Single-File Components

简写`SFC`，中文`单文件组件`，将 js、html、css 封装在了一个后缀名为`.vue`的文件里。

一般的格式：

```vue
<template></template>

<script setup></script>

<style scoped></style>
```
