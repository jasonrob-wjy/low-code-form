<template>
  <div class="right-side-container" @wheel="handleScroll($event)">
    <div
      v-if="store.currentComponentIndex === -1"
      class="content flex justify-content-center align-items-center"
    >
      点击题型进行编辑
    </div>
    <div v-else>
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { handleScroll } from '@/utils'
import EditPannel from '@/components/SurveyComs/EditItems/EditPannel.vue'

// 类型
import type { EditorStore } from '@/types'
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore() as EditorStore
const currentCom = computed(() => store.coms[store.currentComponentIndex])
// 右侧编辑面板的父组件提供修改状态的方法
</script>

<style scoped lang="scss">
.right-side-container {
  width: 320px;
  height: calc(100vh - 50px - 40px);
  position: fixed;
  right: 20px;
  top: 70px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  overflow-y: scroll;
}
.content {
  height: 100%;
}
</style>
