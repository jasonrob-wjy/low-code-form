// db.ts
import Dexie, { type Table } from 'dexie'
import type { SurveyDBData } from '@/types'

// 定义数据库
class SurveyDatabase extends Dexie {
  surveys!: Table<SurveyDBData, number> // 表名和主键类型

  constructor() {
    super('SurveyDatabase')
    this.version(1).stores({
      surveys: '++id, createDate, updateDate, title, surveyCount, coms', // 定义表的模式
    })
  }
}

// 实例化数据库
const db = new SurveyDatabase()

// 导出数据库实例和类型
export { db }
