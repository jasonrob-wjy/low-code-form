/**
 * 该仓库用于存储组件市场当前的业务组件
 */
import { defineStore } from 'pinia'
import type { Material, Status } from '@/types'
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap'
import {
  addOption,
  removeOption,
  setPosition,
  setSize,
  setWeight,
  setItalic,
  setColor,
  setTextType,
  setTextStatus,
  setUse,
  setOptionsStatusByIndex,
  setPicLinkByIndex,
} from '@/stores/actions'
// 工具方法
import { updateInitStatusBeforeAdd } from '@/utils'

// 部分状态需要提前初始化
const keysToInitialize = [
  'personal-info-tel',
  'personal-info-wechat',
  'personal-info-qq',
  'personal-info-email',
  'personal-info-address',
  'personal-info-name',
  'personal-info-id',
  'personal-info-gender',
  'personal-info-age',
  'personal-info-education',
  'personal-info-career',
  'personal-info-birth',
  'personal-info-collage',
  'personal-info-major',
  'personal-info-industry',
  'personal-info-company',
  'personal-info-position',
] as Material[]

const initializedStates: { [key: string]: Status } = {}

keysToInitialize.forEach((key) => {
  const defaultStatus = defaultStatusMap[key]()
  updateInitStatusBeforeAdd(defaultStatus, key)
  initializedStates[key] = defaultStatus
})

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    currentMaterialCom: 'single-select' as Material,
    coms: {
      'single-select': defaultStatusMap['single-select'](),
      'multi-select': defaultStatusMap['multi-select'](),
      'option-select': defaultStatusMap['option-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
      'multi-pic-select': defaultStatusMap['multi-pic-select'](),
      'text-input': defaultStatusMap['text-input'](),
      'rate-score': defaultStatusMap['rate-score'](),
      'date-time': defaultStatusMap['date-time'](),
      'text-note': defaultStatusMap['text-note'](),
      'personal-info-name': initializedStates['personal-info-name'],
      'personal-info-id': initializedStates['personal-info-id'],
      'personal-info-tel': initializedStates['personal-info-tel'],
      'personal-info-wechat': initializedStates['personal-info-wechat'],
      'personal-info-qq': initializedStates['personal-info-qq'],
      'personal-info-email': initializedStates['personal-info-email'],
      'personal-info-address': initializedStates['personal-info-address'],
      'personal-info-gender': initializedStates['personal-info-gender'],
      'personal-info-age': initializedStates['personal-info-age'],
      'personal-info-education': initializedStates['personal-info-education'],
      'personal-info-career': initializedStates['personal-info-career'],
      'personal-info-birth': initializedStates['personal-info-birth'],
      'personal-info-collage': initializedStates['personal-info-collage'],
      'personal-info-major': initializedStates['personal-info-major'],
      'personal-info-industry': initializedStates['personal-info-industry'],
      'personal-info-company': initializedStates['personal-info-company'],
      'personal-info-position': initializedStates['personal-info-position'],
    },
  }),
  actions: {
    setCurrentSurveyCom(com: Material) {
      this.currentMaterialCom = com
    },
    addOption,
    removeOption,
    setPosition,
    setSize,
    setWeight,
    setItalic,
    setColor,
    setTextType,
    setTextStatus,
    setUse,
    setOptionsStatusByIndex,
    setPicLinkByIndex,
  },
})
