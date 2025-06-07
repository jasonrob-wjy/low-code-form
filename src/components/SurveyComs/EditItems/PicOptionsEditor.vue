<template>
  <div>
    <div class="flex align-items-center">
      <div class="mr-10">题目选项</div>
      <el-button size="small" :icon="Plus" circle @click="addOptionHandle" />
    </div>
    <div v-for="(item, index) in textArr" :key="index">
      <div class="title mt-10 mb-10 flex align-items-center">
        <span>选项{{ index + 1 }}</span>
        <el-button
          type="danger"
          class="ml-5 delete"
          size="small"
          :icon="Minus"
          circle
          @click="removeOption(index)"
        />
      </div>
      <div class="mb-5">
        <div v-if="item.value" class="flex">
          <span class="title mr-5">已上传图片</span>
          <el-link type="primary" @click="deletePic(index)">删除图片</el-link>
        </div>
        <span v-else class="title">未上传图片</span>
      </div>
      <el-input class="mb-5" v-model="item.picTitle" placeholder="标题" />
      <el-input
        class="item mb-5"
        :rows="3"
        type="textarea"
        placeholder="请输入题目说明（选填）"
        v-model="textArr[index].picDesc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import type { VueComType, PicTitleDescStatusArr } from '@/types'
import { inject, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps<{
  currentStatus: number
  status: PicTitleDescStatusArr
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
function deletePic(index: number) {
  ElMessageBox.confirm('是否确认删除已上传的图片？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (updateStatus) {
        updateStatus(props.configKey, {
          link: '',
          index,
        })
      }
      ElMessage({
        type: 'success',
        message: '已删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>

<style scoped>
.title {
  color: var(--font-color-light);
  font-size: var(--font-size-base);
}
.delete {
  transform: scale(0.8);
}
</style>
