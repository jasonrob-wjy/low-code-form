import { db } from './db'
import type { SurveyDBData } from '@/types'

// 添加数据
export async function saveSurvey(survey: SurveyDBData) {
  return await db.surveys.add(survey)
}

// 查询数据
export async function getSurveys() {
  const allSurveys = await db.surveys.toArray()
  return allSurveys
}

// 获取单个数据
export async function getSurveyById(id: number) {
  const survey = await db.surveys.get(id)
  return survey
}

// 更新数据
export async function updateSurvey(id: number, updatedSurvey: Partial<SurveyDBData>) {
  await db.surveys.update(id, updatedSurvey)
}

// 删除数据
export async function deleteSurvey(id: number) {
  return await db.surveys.delete(id)
}
