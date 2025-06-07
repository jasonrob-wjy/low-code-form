import { computed } from 'vue'
// 类型
import type { Status } from '@/types'
import { isSurveyComName } from '@/types'

// 计算题目编号
export function useSurveyNo(coms: Status[]) {
  return computed(() => {
    let questionNumber = 1
    return coms.map((com) => {
      if (isSurveyComName(com.name)) {
        return questionNumber++
      }
      return null
    })
  })
}
