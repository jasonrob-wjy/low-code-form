<template>
  <div>
    <div
      class="survey-com-item-container pointer flex justify-content-center align-items-center self-center pl-10 pr-10 mb-10"
      @click="addSurveyComItem"
    >
      <div>{{ item?.comName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// EventBus
import EventBus from '@/utils/eventBus'
import type { PropType } from 'vue'
import type { MaterialItem } from '@/types'
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap'
// 仓库
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore()
import { updateInitStatusBeforeAdd } from '@/utils'
const props = defineProps({
  item: Object as PropType<MaterialItem>,
})

const addSurveyComItem = () => {
  const newMaterialName = props.item?.materialName
  if (!newMaterialName) {
    console.warn('newMaterialName is required')
    return
  }
  const status = defaultStatusMap[newMaterialName]()
  updateInitStatusBeforeAdd(status, newMaterialName)
  store.addCom(store.coms, status)
  EventBus.emit('scrollToBottom')
}
</script>

<style scoped lang="scss">
.survey-com-item-container {
  width: 60px;
  height: 30px;
  background-color: var(--background-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  user-select: none;
}
.survey-com-item-container:hover {
  background-color: var(--font-color-lightest);
}
</style>
