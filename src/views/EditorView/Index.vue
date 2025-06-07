<template>
  <div>
    <div class="header">
      <Header :isEditor="true" :id="id" />
    </div>
    <div class="container">
      <LeftSide />
      <RightSide />
    </div>
    <div>
      <Center />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { ElMessage } from 'element-plus'
// db
import { getSurveyById } from '@/db/operation'
import Header from '@/components/Common/Header.vue'
import LeftSide from './LeftSide/Index.vue'
import Center from './Center.vue'
import RightSide from './RightSide.vue'
// 仓库
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore()
store.initStore() // 先初始化一次状态，保证进入编辑器时有初始状态
// 路由
import { useRoute } from 'vue-router'
const route = useRoute()
// 工具
import { restoreComponentStatus } from '@/utils'
// 数据仓库更新方法
import { dispatchStatus } from '@/stores/dispatch'
// 类型
import type { UpdateStatus, TypeStatus, OptionsStatus, GetLink, PicLink } from '@/types'

// 如果有传递过来 id，就从数据库中获取数据来初始化仓库
const id = computed(() => (route.params.id ? String(route.params.id) : undefined))
if (id.value) {
  getSurveyById(Number(id.value)).then((res) => {
    if (res) {
      restoreComponentStatus(res.coms)
      store.setStore(res)
    }
  })
}
// 向子组件提供修改状态的方法
const updateStatus: UpdateStatus = (
  configKey: string,
  payload?: number | string | boolean | object,
  isShowChange?: boolean,
) => {
  // 如果没有选中组件，不执行
  if (store.currentComponentIndex === -1) {
    ElMessage({
      message: '请先将组件处于编辑状态',
      type: 'warning',
    })
    return
  }
  const status = store.coms[store.currentComponentIndex].status as unknown as
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
.header {
  width: 100%;
  background-color: var(--white);
  position: fixed;
  top: 0;
  z-index: 10;
}
.container {
  width: calc(100vw - 40px);
  padding: 20px;
  // Header的高度50px，上下padding 20px
  height: calc(100vh - 50px - 40px);
  background: url('@/assets/imgs/editor_background.png');
  position: fixed;
  top: 50px;
}
</style>
