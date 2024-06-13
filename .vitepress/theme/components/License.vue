<template>
  <div class="license p-4 rounded-lg mb-12" style="background-color: #f5f5f5">
    <div class="license-title">
      <h3>{{ title }}</h3>
    </div>
    <div class="font-thin text-3 text-gray">
      <span>URL: </span>
      <a :href="url">{{ url }}</a>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-col mr-4">
        <div class="text-3">作者</div>
        <div style="font: 'Black Rose'">
          {{ author }}
        </div>
      </div>
      <div class="flex flex-col mr-4">
        <div class="text-3">发布于</div>
        <div>{{ createTime }}</div>
      </div>
      <div class="flex flex-col mr-4">
        <div class="text-3">更新于</div>
        <div>{{ updateTime }}</div>
      </div>
      <div class="flex flex-col">
        <div class="text-3">许可协议</div>
        <div>
          <a :href="licenseUrl" target="_blank">{{ license }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  url: String,
  author: String,
  createTime: String,
  updateTime: String,
  license: String,
  licenseUrl: String,
});
</script>
