<template>
  <div ref="preview-container" class="preview-container pb-40">
    <div class="center mc">
      <div class="button-group flex space-between align-items-center">
        <div class="flex space-between no-print">
          <el-button type="danger" @click="gobackHandle">返回</el-button>
          <el-button type="success" @click="genQuiz">生成在线问卷</el-button>
          <el-button type="warning" @click="genPDF">生成本地PDF</el-button>
        </div>
        <div class="mr-15">
          <el-text class="mx-1">题目数量：{{ store.surveyCount }}</el-text>
        </div>
      </div>
      <div class="content-group no-border">
        <div class="content mb-10" v-for="(com, index) in store.coms" :key="index">
          <component :is="com.type" :status="com.status" :serialNum="serialNum[index]" />
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="信息" width="500">
    分享链接: <a :href="quizLink" target="_blank">{{ quizLink }}</a>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="copyLink">复制链接</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// 路由
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 仓库
import { useEditorStore } from '@/stores/useEditor'
const store = useEditorStore()
// db
import { getSurveyById } from '@/db/operation'
// 工具
import { restoreComponentStatus } from '@/utils'
import { v4 as uuidv4 } from 'uuid'
// 引入 ElementPlus 库
import { ElMessage } from 'element-plus'
import { isUseForPDF } from '@/types'

// 获取路由参数
// 主要解决从主页点击查看问卷时的预览
const id = Number(route.params.id)
if (id) {
  getSurveyById(id).then((res) => {
    if (res) {
      restoreComponentStatus(res.coms)
      store.setStore(res)
    }
  })
}
const scrollToTop = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
onMounted(() => {
  scrollToTop()
})

// 组合式函数
import { useSurveyNo } from '@/utils/hooks'
// 获取题目编号
const serialNum = computed(() => useSurveyNo(store.coms).value)

const gobackHandle = () => {
  const path = history.state.from
  if (path === 'home') {
    router.back()
  } else {
    router.push(`/editor/${id}/survey-type`)
  }
}

// 生成PDF
function genPDF() {
  const checkResult = store.coms.every((item) => isUseForPDF(item.name))
  if (!checkResult) {
    ElMessage({
      message: '存在不支持PDF导出的组件，请先移除这些组件',
      type: 'warning',
    })
    return
  }
  // 生成PDF之前需要检查
  window.print()
}

const dialogVisible = ref(false) // 控制弹窗
const quizLink = ref('') // 问卷链接
// 生成在线问卷
function genQuiz() {
  const id = uuidv4()
  // 将问卷信息和唯一ID保存到服务器
  fetch('/api/saveQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      quizData: {
        coms: JSON.stringify(store.coms),
        surveyCount: store.surveyCount,
      },
    }),
  })
  // 打开对话框，显示在线答题链接
  quizLink.value = `${window.location.origin}/quiz/${id}`
  dialogVisible.value = true
}

function copyLink() {
  dialogVisible.value = false
  navigator.clipboard.writeText(quizLink.value)
  ElMessage({
    message: '链接已复制',
    type: 'success',
  })
}
</script>

<style scoped lang="scss">
.preview-container {
  width: 100vw;
  min-height: 100vh;
  background: url('@/assets/imgs/editor_background.png');
}
.center {
  width: 800px;
}
.button-group {
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 100;
}
.content-group {
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--white);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
@media print {
  .no-print {
    display: none;
  }
  .no-border {
    border: none;
    box-shadow: none;
  }
}
</style>
