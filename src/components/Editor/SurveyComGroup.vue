<template>
  <div class="survey-com-group-container mc">
    <div class="mb-20">
      <div class="group-title font-weight-500 mb-15 flex align-items-center">
        <el-icon>
          <component :is="icon" />
        </el-icon>
        <div class="ml-5 title">{{ title }}</div>
      </div>
      <div class="flex wrap space-between">
        <SurveyComItem v-for="(item, index) in list" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { VueComType, MaterialItemList } from '@/types'
import SurveyComItem from './SurveyComItem.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: Object as PropType<VueComType>,
    required: true,
  },
  list: {
    type: Array as PropType<MaterialItemList>,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.survey-com-group-container {
  width: 90%;
}
.title {
  font-size: var(--font-size-base);
  position: relative;
  bottom: 1px;
}
</style>
