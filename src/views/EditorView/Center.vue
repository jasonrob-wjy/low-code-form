<template>
  <div ref="centerContainer" class="center-container">
    <draggable v-model="store.coms" item-key="index" @start="dragstart">
      <template #item="{ element, index }">
        <div
          class="content mb-10 relative"
          :class="{
            active: store.currentComponentIndex === index,
          }"
          @click="clickHandle(index)"
          :key="element.id"
          :ref="(el) => (componentRefs[index] = el)"
        >
          <component :is="element.type" :status="element.status" :serialNum="serialNum[index]" />
          <div class="absolute delete-btn" v-show="store.currentComponentIndex === index">
            <el-button
              type="danger"
              class="ml-10"
              size="small"
              :icon="Close"
              circle
              @click.stop="removeCom(index)"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 拖动组件
import draggable from 'vuedraggable'
// EventBus
import EventBus from '@/utils/eventBus'
// 仓库
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore()

// 组合式函数
import { useSurveyNo } from '@/utils/hooks'
// 获取题目编号
const serialNum = computed(() => useSurveyNo(store.coms).value)

const centerContainer = ref<HTMLElement | null>(null) // 明确声明类型
const componentRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const clickHandle = function (index: number) {
  if (store.currentComponentIndex === index) {
    store.setCurrentComponentIndex(-1)
  } else {
    store.setCurrentComponentIndex(index)
    scrollToCenter(index)
  }
}
const scrollToBottom = function () {
  nextTick(() => {
    const container = centerContainer.value
    if (container) {
      window.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  })
}
const scrollToCenter = function (index: number) {
  nextTick(() => {
    const element = componentRefs.value[index]
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}
EventBus.on('scrollToBottom', scrollToBottom)
EventBus.on('scrollToCenter', scrollToCenter)

function removeCom(index: number) {
  ElMessageBox.confirm('是否确定删除此模块？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.removeCom(index)
      store.setCurrentComponentIndex(-1)
      ElMessage({
        type: 'success',
        message: '已删除',
      })
    })
    .catch(() => {
      console.log('取消删除')
    })
}
// 拖动开始
function dragstart() {
  // 拖动开始的时候，将当前选中的组件取消选中
  store.setCurrentComponentIndex(-1)
}
</script>

<style scoped>
.center-container {
  width: 50%;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  margin: 70px auto;
  padding: 20px;
  background: var(--white);
  position: relative;
  .content {
    cursor: pointer;
    padding: 10px;
    background-color: var(--white);
    border-radius: var(--border-radius-sm);
    &:hover {
      transform: scale(1.01);
      transition: 0.5s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
.active {
  transform: scale(1.01);
  transition: 0.5s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.delete-btn {
  right: -5px;
  top: -10px;
}
</style>
