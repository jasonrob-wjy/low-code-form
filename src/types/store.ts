import type { TextProps, OptionsProps, Status, Material, SurveyDBData } from '@/types'

// 定义 updateStatus 的类型
export type UpdateStatus = (
  configKey: string,
  payload?: number | string | boolean | object,
  isShowChange?: boolean,
) => void
export type PicLink = { link: string; index: number }
export type GetLink = (obj: PicLink) => void

export type optionsStatusByIndexPayload = {
  val: string
  index: number
}

export function isOptionsStatusByIndexPayload(obj: object): obj is optionsStatusByIndexPayload {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'val' in obj &&
    typeof (obj as optionsStatusByIndexPayload).val === 'string' &&
    'index' in obj &&
    typeof (obj as optionsStatusByIndexPayload).index === 'number'
  )
}

export function isPicLink(obj: object): obj is PicLink {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'link' in obj &&
    typeof (obj as PicLink).link === 'string' &&
    'index' in obj &&
    typeof (obj as PicLink).index === 'number'
  )
}

export interface Actions {
  addOption: (optionProps: OptionsProps) => void
  removeOption: (optionProps: OptionsProps, index: number) => boolean
  setPosition: (positionProps: OptionsProps, index: number) => void
  setSize: (sizeProps: OptionsProps, index: number) => void
  setWeight: (weightProps: OptionsProps, index: number) => void
  setItalic: (italicProps: OptionsProps, index: number) => void
  setColor: (colorProps: TextProps, color: string) => void
  setTextType: (typeProps: OptionsProps, index: number) => void
  setTextStatus: (textProps: TextProps, text: string) => void
  setUse: (optionsProps: OptionsProps, isUse: boolean) => void
  setOptionsStatusByIndex: (
    optionsProps: OptionsProps,
    payload: optionsStatusByIndexPayload,
  ) => void
  setPicLinkByIndex: (optionsProps: OptionsProps, payload: PicLink) => void
}

export interface MaterialStore extends Actions {
  currentMaterialCom: Material
  coms: Record<Material, Status>
  setCurrentSurveyCom: (com: Material) => void
}

export interface EditorStore extends Actions {
  currentComponentIndex: number
  surveyCount: number
  coms: Status[]
  setCurrentComponentIndex: (index: number) => void
  addCom: (coms: Status[], newCom: Status) => void
  setStore: (storeStatus: SurveyDBData) => void
  initStore: () => void
  removeCom: (index: number) => void
  resetComs: () => void
}

export type QuizData = {
  surveyCount: number
  coms: Status[]
}
