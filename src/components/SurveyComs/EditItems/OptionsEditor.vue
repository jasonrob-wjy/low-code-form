<template>
  <div key="id">
    <div class="flex align-items-center mb-10">
      <div class="mr-10">题目选项</div>
      <el-button size="small" :icon="Plus" circle @click="addOptionHandle" />
    </div>
    <div v-for="(_, index) in status" :key="index" class="flex align-items-center">
      <el-input placeholder="选项" class="mt-5 mb-5" v-model="textArr[index]" />
      <el-button
        type="danger"
        class="ml-10"
        size="small"
        :icon="Minus"
        circle
        @click="removeOption(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import type { VueComType, StringStatusArr } from '@/types'
import { inject, ref } from 'vue'
const props = defineProps<{
  currentStatus: number
  status: StringStatusArr
  isShow: boolean
  configKey: string
  editCom: VueComType
  id: string
}>()
// 定义类型
import type { UpdateStatus } from '@/types'

// 注入 updateStatus
const updateStatus = inject<UpdateStatus>('updateStatus')

const textArr = ref(props.status)

function addOptionHandle() {
  if (updateStatus) {
    updateStatus(props.configKey)
  }
}
function removeOption(index: number) {
  if (updateStatus) {
    updateStatus(props.configKey, index)
  }
}
</script>

<style scoped></style>
