<template>
  <div class="layout-container flex">
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <div class="center">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :status="store.coms[store.currentMaterialCom].status"
          :serialNum="1"
        />
      </RouterView>
    </div>
    <div class="right">
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import EditPannel from '@/components/SurveyComs/EditItems/EditPannel.vue'
// 类型
import type {
  MaterialStore,
  UpdateStatus,
  TypeStatus,
  OptionsStatus,
  GetLink,
  PicLink,
} from '@/types'
// 仓库
import { useMaterialStore } from '@/stores/useMaterial'
// 数据仓库更新方法
import { dispatchStatus } from '@/stores/dispatch'
const store = useMaterialStore() as unknown as MaterialStore
const currentCom = computed(() => store.coms[store.currentMaterialCom])
// 右侧编辑面板的父组件提供修改状态的方法
const updateStatus: UpdateStatus = (
  configKey: string,
  payload?: number | string | boolean | object,
  isShowChange?: boolean,
) => {
  const status = store.coms[store.currentMaterialCom].status as unknown as
    | TypeStatus
    | OptionsStatus
  dispatchStatus(store, status, configKey, payload, isShowChange)
}
provide('updateStatus', updateStatus)
const getPicLink: GetLink = (link: PicLink) => {
  // 拿到上传的链接地址，从而更新状态仓库
  updateStatus('options', link)
}
provide('getPicLink', getPicLink)
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  // Header组件高度50px，h1高度50px，上下margin 20px，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 20px);
  align-items: flex-start;
  border: 1px solid var(--border-color);
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}
.left {
  width: 180px;
  text-align: center;
  align-items: flex-start;
  padding: 20px;
}
.center {
  width: 550px;
  // 多减去的60px是上下的padding，，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 60px - 20px);
  overflow-y: scroll;
  padding: 30px;
  border-left: 1px solid var(--border-color);
}
.right {
  width: 350px;
  height: calc(100vh - 100px - 40px - 20px);
  overflow-y: scroll;
  border-left: 1px solid var(--border-color);
}
</style>
