<template>
  <div class="editPannelContainer">
    <div v-for="(item, key) in com.status" :key="item.id" class="mb-20">
      <!-- 这里需要将 key 传递给编辑组件 -->
      <!-- 因为有一些设置项共用同一个编辑组件，例如设置标题字体大小和设置描述字体大小，共用SizeEditor组件 -->
      <!-- 编辑组件需要根据这个key获取对应的状态 -->
      <component v-if="item.isShow" :is="item.editCom" :config-key="key" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types'
defineProps<{
  com: Status
}>()
</script>

<style scoped>
.editPannelContainer {
  padding: 30px;
  background-color: var(--bg-color);
}
</style>
