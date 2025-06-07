<template>
  <div>
    <div class="container">
      <h1 class="font-weight-100 text-center">Jansonrob's Low-Code Form</h1>
      <div class="mb-15">
        <el-button type="primary" :icon="Plus" @click="goToEditor">创建问卷</el-button>
        <el-button type="success" :icon="Compass" @click="goToComMarket">组件市场</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          fixed
          prop="createDate"
          label="创建日期"
          width="150"
          :formatter="formatDate"
        />
        <el-table-column prop="title" label="问卷标题" />
        <el-table-column prop="surveyCount" label="题目数" width="150" align="center" />
        <el-table-column
          prop="updateDate"
          label="最近更新日期"
          width="150"
          align="center"
          :formatter="formatDate"
        />
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="viewSurvey(scope.row)"
              >查看问卷</el-button
            >
            <el-button link type="primary" size="small" @click="editSurvey(scope.row)"
              >编辑</el-button
            >
            <el-button link type="primary" size="small" @click="delSurvey(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Compass } from '@element-plus/icons-vue'
// 路由
import { useRouter } from 'vue-router'
const router = useRouter()
// 类型
import type { SurveyDBData, SurveyDBReturnData } from '@/types'
// indexedDB
import { getSurveys } from '@/db/operation'
// 工具方法
import { formatDate } from '@/utils'
import { remove } from '@/utils/dboperate'

const tableData = ref<SurveyDBData[]>([])

function getSurveyData() {
  getSurveys().then((res) => {
    tableData.value = res
  })
}
getSurveyData()

const goToEditor = () => {
  localStorage.setItem('activeView', 'editor')
  router.push('/editor/survey-type')
}

const goToComMarket = () => {
  localStorage.setItem('activeView', 'materials')
  router.push('/materials')
}

const viewSurvey = (surveyInfo: SurveyDBReturnData) => {
  router.push({
    path: `/preview/${surveyInfo.id}`,
    state: { from: 'home' },
  })
}

const editSurvey = (surveyInfo: SurveyDBReturnData) => {
  router.push(`/editor/${surveyInfo.id}/survey-type`)
}

const delSurvey = (surveyInfo: SurveyDBReturnData) => {
  remove(Number(surveyInfo.id)).then(() => {
    getSurveyData()
  })
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
