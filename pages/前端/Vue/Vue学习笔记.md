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

### v-bind 的进一步简写

vue 3.4 之后，如果属性名和变量同名可以进一步减少。

```vue
<template>
  <div :id></div>
</template>
<script>
const id = 1;
</script>
```

### 动态参数

元素的属性名可以是动态的变量。

```vue
<a :[attributeName]="url"> ... </a>

<a @[eventName]="doSomething"> ... </a>
```

### 修饰符

可用来修饰 v-on 和 v-model

### 响应式

`ref()`返回的是一个对象，在 script 中可以通过`.value`访问实际值，在 template 中则不需要。

`ref()` 具有深层响应性，嵌套对象或数组里的任何值改变都会响应。

`reactive()`会返回一个 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，使用时不需要加`.value`，也具有深层响应性。

::: tip reactive() 的局限性

1. 只能用于对象、数组和集合，不能用于基础类型
2. 不能替换整个对象，否则响应性就会失效
3. 从 Proxy 中解构出来的值，或者传入方法中的值不具备响应性

所以官方建议使用`ref()`

:::

### 计算属性

---

## Single-File Components

简写`SFC`，中文`单文件组件`，将 js、html、css 封装在了一个后缀名为`.vue`的文件里。

一般的格式：

```vue
<template></template>

<script setup></script>

<style scoped></style>
```
