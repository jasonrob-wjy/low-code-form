import type { TextProps, OptionsProps, optionsStatusByIndexPayload, PicLink } from '@/types'
import { isStringArray, isPicTitleDescArray } from '@/types'

export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text
}

export function addOption(optionProps: OptionsProps) {
  if (isStringArray(optionProps.status)) {
    const lastOption = optionProps.status[optionProps.status.length - 1]
    const lastDigit = lastOption.split('').reverse()[0]
    // 有可能最后一项拿到的不是数字
    // 比如性别预设值：男、女、保密，这时候就需要手动判断
    if (!isNaN(Number(lastDigit))) {
      optionProps.status.push(`新增选项${Number(lastDigit) + 1}`)
    } else {
      optionProps.status.push(`新增选项1`)
    }
  } else if (isPicTitleDescArray(optionProps.status)) {
    const lastOption = optionProps.status[optionProps.status.length - 1]
    const lastDigit = lastOption.picTitle.split('').reverse()[0]
    if (!isNaN(Number(lastDigit))) {
      optionProps.status.push({
        value: '',
        picTitle: `新增图片标题${Number(lastDigit) + 1}`,
        picDesc: `说明（选填，限30字）`,
      })
    } else {
      optionProps.status.push({
        value: '',
        picTitle: `新增图片标题1`,
        picDesc: `说明（选填，限30字）`,
      })
    }
  }
}

export function removeOption(optionProps: OptionsProps, index: number): boolean {
  if (optionProps.status.length === 2) {
    return false
  }
  optionProps.status.splice(index, 1)
  return true
}

export function setPosition(positionProps: OptionsProps, index: number) {
  positionProps.currentStatus = index
}

export function setSize(sizeProps: OptionsProps, index: number) {
  sizeProps.currentStatus = index
}

export function setWeight(weightProps: OptionsProps, index: number) {
  weightProps.currentStatus = index
}

export function setItalic(italicProps: OptionsProps, index: number) {
  italicProps.currentStatus = index
}

export function setColor(colorProps: TextProps, color: string) {
  colorProps.status = color
}

export function setTextType(typeProps: OptionsProps, index: number) {
  typeProps.currentStatus = index
}

export function setUse(optionsProps: OptionsProps, isUse: boolean) {
  optionsProps.isUse = isUse
}

export function setOptionsStatusByIndex(
  optionsProps: OptionsProps,
  payload: optionsStatusByIndexPayload,
) {
  optionsProps.status[payload.index] = payload.val
}

export function setPicLinkByIndex(optionsProps: OptionsProps, payload: PicLink) {
  if (isPicTitleDescArray(optionsProps.status))
    optionsProps.status[payload.index].value = payload.link
}
