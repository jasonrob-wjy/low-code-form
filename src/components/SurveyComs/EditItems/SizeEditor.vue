<template>
  <ButtonGroup
    :title="`${configKey === 'titleSize' ? '标题' : '描述'}尺寸`"
    :status="status[currentStatus]"
  >
    <el-button-group>
      <el-button
        :class="{
          select: currentStatus === 0,
        }"
        @click="changeFontSize(0)"
      >
        <font-awesome-icon icon="font" size="lg" />
      </el-button>
      <el-button
        :class="{
          select: currentStatus === 1,
        }"
        @click="changeFontSize(1)"
      >
        <font-awesome-icon icon="font" size="sm" />
      </el-button>
      <el-button
        :class="{
          select: currentStatus === 2,
        }"
        @click="changeFontSize(2)"
      >
        <font-awesome-icon icon="font" size="xs" />
      </el-button>
    </el-button-group>
  </ButtonGroup>
</template>

<script setup lang="ts">
import type { VueComType, UpdateStatus } from '@/types'
import { inject } from 'vue'
import ButtonGroup from './ButtonGroup.vue'
const updateStatus = inject<UpdateStatus>('updateStatus')
const props = defineProps<{
  currentStatus: number
  status: string[]
  isShow: boolean
  configKey: string
  editCom: VueComType
}>()
function changeFontSize(pos: number) {
  if (updateStatus) {
    updateStatus(props.configKey, pos)
  } else {
    console.warn('updateStatus is not provided')
  }
}
</script>
