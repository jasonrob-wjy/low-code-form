<template>
  <div key="id">
    <div class="mb-10">标题内容</div>
    <el-input placeholder="请输入题目标题" v-model="text" @update:modelValue="inputHandle" />
  </div>
</template>

<script setup lang="ts">
import type { VueComType } from '@/types'
import { inject, ref } from 'vue'

// 定义 props
const props = defineProps<{
  status: string
  isShow: boolean
  configKey: string
  editCom: VueComType
  id: string
}>()

// 定义类型
import type { UpdateStatus } from '@/types'

// 注入 updateStatus
const updateStatus = inject<UpdateStatus>('updateStatus')

// 定义响应式变量
const text = ref(props.status)

// 监听输入事件并更新状态
function inputHandle(newVal: string) {
  text.value = newVal // 更新绑定的值
  if (updateStatus) {
    updateStatus(props.configKey, newVal)
  } else {
    console.error('updateStatus is not defined.')
  }
}
</script>
