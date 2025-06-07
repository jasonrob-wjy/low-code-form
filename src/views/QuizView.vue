<template>
  <div v-if="quizData">
    <div class="quiz-container mc">
      <div class="mt-30 mb-20">题目数量：{{ quizData.surveyCount }}</div>
      <div class="content mb-10" v-for="(com, index) in quizData.coms" :key="index">
        <component
          :is="com.type"
          :status="com.status"
          :serialNum="serialNum[index]"
          @updateAnswer="updateAnswer(index, $event)"
        />
      </div>
      <div class="mt-20 mb-20 text-center">
        <el-button type="primary" @click="submitAnswers">提交答案</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { QuizData } from '@/types'
// 工具
import { restoreComponentStatus } from '@/utils'
// 组合式函数
import { useSurveyNo } from '@/utils/hooks'
// 引入 ElementPlus 库
import { ElMessage } from 'element-plus'
// 路由
import { useRoute } from 'vue-router'
const route = useRoute()

const quizData = ref<QuizData>({
  coms: [],
  surveyCount: 0,
})
// 用于存储所有问题的答案
const answers: Ref<{ [key: number]: string | number | Date }> = ref({})
// 获取题目编号
const serialNum = computed(() => useSurveyNo(quizData.value?.coms).value)
onMounted(async () => {
  const quizId = route.params.id
  // 从服务器获取试卷信息
  const response = await fetch(`/api/getQuiz/${quizId}`)
  const data = await response.json()
  data.coms = JSON.parse(data.coms)
  restoreComponentStatus(data.coms)
  // 拿到试题数据
  quizData.value = data
})

const updateAnswer = (index: number, answer: string | number | Date) => {
  // index是题目本来的索引，通过serialNum.value[index]获取显示的题目索引
  // 检查 serialNum.value[index] 是否为 null
  const serial = serialNum.value[index]
  if (serial !== null) {
    answers.value[serial] = answer
  } else {
    // 处理 serialNum.value[index] 为 null 的情况
    console.error(`The serial number at index ${index} is null.`)
  }
}

const submitAnswers = async () => {
  const quizId = route.params.id
  await fetch('/api/submitAnswers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quizId, answers: answers.value }),
  })
  ElMessage({
    message: '答案已提交',
    type: 'success',
  })
}
</script>

<style scoped lang="scss">
.quiz-container {
  width: 800px;
}
</style>
