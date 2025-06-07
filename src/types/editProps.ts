import type { VueComType } from './common'

export interface BaseProps {
  id: string
  isShow: boolean
  editCom: VueComType
  name: string
  isUse?: boolean
}

export interface TextProps extends BaseProps {
  status: string
}

export type StringStatusArr = string[]
export type ValueStatusArr = Array<{ value: string; status: string }>
export type PicTitleDescStatusArr = Array<{
  picTitle: string
  picDesc: string
  value: string
}>

export type StatusArray = StringStatusArr | ValueStatusArr | PicTitleDescStatusArr

export interface OptionsProps extends BaseProps {
  status: StringStatusArr | ValueStatusArr | PicTitleDescStatusArr
  currentStatus: number
}

export interface BaseStatus {
  title: TextProps
  desc: TextProps
  position: OptionsProps
  titleSize: OptionsProps
  descSize: OptionsProps
  titleWeight: OptionsProps
  descWeight: OptionsProps
  titleItalic: OptionsProps
  descItalic: OptionsProps
  titleColor: TextProps
  descColor: TextProps
}

export interface TypeStatus extends BaseStatus {
  type: OptionsProps
}

export interface OptionsStatus extends BaseStatus {
  options: OptionsProps
}

// 类型保护函数：检查是否有 type 属性
export function hasType(status: BaseStatus): status is TypeStatus {
  return (status as TypeStatus).type !== undefined
}

// 类型保护函数：检查是否有 options 属性
export function hasOptions(status: BaseStatus): status is OptionsStatus {
  return (status as OptionsStatus).options !== undefined
}

/**
 * 下面两个类型保护函数用于检查 props 是否为 TextProps 或 OptionsProps 类型
 */
export function isTextProps(props: TextProps | OptionsProps): props is TextProps {
  return typeof props.status === 'string'
}

export function isOptionsProps(props: TextProps | OptionsProps): props is OptionsProps {
  return props && Array.isArray(props.status)
}

/**
 * 下面三个类型保护函数用于检查 status 是否为：
 * Array<{ value: string; status: string }>
 * Array<{ picTitle: string; picDesc: string }>
 * string[]
 */

// 类型谓词函数，用于检查 status 是否为 Array<{ value: string; status: string }>
export function isValueStatusArray(status: StatusArray): status is ValueStatusArr {
  return (
    Array.isArray(status) &&
    status.length > 0 &&
    typeof status[0] === 'object' &&
    'value' in status[0] &&
    'status' in status[0]
  )
}

// 类型谓词函数，用于检查 status 是否为 Array<{ picTitle: string; picDesc: string }>
export function isPicTitleDescArray(status: StatusArray): status is PicTitleDescStatusArr {
  return (
    Array.isArray(status) &&
    status.length > 0 &&
    typeof status[0] === 'object' &&
    'picTitle' in status[0] &&
    'picDesc' in status[0]
  )
}

// 类型谓词函数，用于检查 status 是否为 string[]
export function isStringArray(status: StatusArray): status is string[] {
  return Array.isArray(status) && (status.length === 0 || typeof status[0] === 'string')
}
