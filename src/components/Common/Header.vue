<template>
  <div>
    <div class="container flex self-start align-items-center border-box">
      <div class="left flex justify-content-center align-items-center">
        <el-button :icon="ArrowLeft" circle size="small" @click="goHome" />
      </div>
      <div class="center flex align-items-center space-between pl-15 pr-15">
        <div v-if="isEditor">
          <div v-if="id">
            <el-button type="warning" size="small" @click="update(store, Number(id))"
              >更新问卷</el-button
            >
          </div>
          <div v-else>
            <el-button type="danger" size="small" @click="reset">重置问卷</el-button>
            <el-button type="success" size="small" @click="saveSurvey">保存问卷</el-button>
          </div>
        </div>
        <div v-if="isEditor">
          <el-button type="primary" size="small" @click="preview">预览</el-button>
        </div>
      </div>
      <div class="right flex justify-content-center align-items-center">
        <el-avatar :size="30" :src="avatar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
// 路由
import { useRouter } from 'vue-router'
const router = useRouter()
// 工具方法
import { save, update } from '@/utils/dboperate'
// 类型
import type { EditorStore } from '@/types'
// 仓库
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore() as EditorStore

const goHome = () => {
  localStorage.setItem('activeView', 'home')
  router.push('/')
}
const props = defineProps({
  isEditor: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    default: '',
  },
})
const avatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
// 重置题目
function reset() {
  ElMessageBox.confirm('是否确定重置试卷？已有题目将全部删除', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.resetComs()
      ElMessage({
        type: 'success',
        message: '已重置',
      })
    })
    .catch(() => {
      console.log('取消重置')
    })
}

// 保存题目
function saveSurvey() {
  save(store).then((id) => {
    router.push(`/editor/${id}/survey-type`)
  })
}

function preview() {
  ElMessageBox.confirm('预览会保存问卷，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (props.id) {
        // 说明是更新
        update(store, Number(props.id)).then(() => {
          router.push({
            path: `/preview/${props.id}`,
            state: { from: 'editor' },
          })
        })
      } else {
        // 说明是新建
        save(store).then((id) => {
          router.push({
            path: `/preview/${id}`,
            state: { from: 'editor' },
          })
        })
      }
    })
    .catch(() => {
      console.log('取消预览')
    })
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  .left {
    width: 60px;
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  .right {
    width: 80px;
    height: 100%;
  }
}
</style>
