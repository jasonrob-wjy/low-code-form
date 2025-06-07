<template>
  <div
    :class="{
      'text-center': computedState.position,
    }"
  >
    <MaterialsHeader
      :serialNum="serialNum"
      :title="computedState.title"
      :titleSize="computedState.titleSize"
      :titleWeight="computedState.titleWeight"
      :titleItalic="computedState.titleItalic"
      :titleColor="computedState.titleColor"
      :desc="computedState.desc"
      :descSize="computedState.descSize"
      :descWeight="computedState.descWeight"
      :descItalic="computedState.descItalic"
      :descColor="computedState.descColor"
    />
    <div class="radio-group">
      <el-radio-group v-model="radioValue" @click.stop @change="emitAnswer">
        <el-radio v-for="(item, index) in computedState.options" :value="item" :key="index">
          {{ item }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  getTextStatus,
  getStringStatusByCurrentStatus,
  getCurrentStatus,
  getStringStatus,
} from '@/utils'
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue'
// 类型
import type { OptionsStatus } from '@/types'
const props = defineProps<{
  status: OptionsStatus
  serialNum: number
}>()

const emits = defineEmits(['updateAnswer'])

const computedState = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  options: getStringStatus(props.status.options),
  position: getCurrentStatus(props.status.position),
  titleSize: getStringStatusByCurrentStatus(props.status.titleSize),
  descSize: getStringStatusByCurrentStatus(props.status.descSize),
  titleWeight: getCurrentStatus(props.status.titleWeight),
  descWeight: getCurrentStatus(props.status.descWeight),
  titleItalic: getCurrentStatus(props.status.titleItalic),
  descItalic: getCurrentStatus(props.status.descItalic),
  titleColor: getTextStatus(props.status.titleColor),
  descColor: getTextStatus(props.status.descColor),
}))

const radioValue = ref<string>('')

const emitAnswer = () => {
  emits('updateAnswer', radioValue.value)
}
</script>

<style scoped lang="scss"></style>
