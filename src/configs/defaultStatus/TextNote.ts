import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue'
import type { Status } from '@/types'
import TextTypeEditor from '@/components/SurveyComs/EditItems/TextTypeEditor.vue'
import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue'
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue'
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue'
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue'
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue'
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue'
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue'
import { markRaw } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default function (): Status {
  return {
    type: markRaw(TextNote),
    name: 'text-note',
    id: uuidv4(),
    status: {
      type: {
        currentStatus: 1,
        status: ['标题', '段落'],
        isShow: true,
        name: 'text-type-editor',
        editCom: markRaw(TextTypeEditor),
        id: uuidv4(),
      },
      title: {
        status: '默认标题内容',
        isShow: false,
        editCom: markRaw(TitleEditor),
        name: 'title-editor',
        id: uuidv4(),
      },
      desc: {
        status: '默认描述内容',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
        id: uuidv4(),
      },
      position: {
        currentStatus: 0,
        status: ['左对齐', '居中对齐'],
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
        id: uuidv4(),
      },
      titleSize: {
        currentStatus: 0,
        status: ['26', '24', '22'],
        isShow: false,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
        id: uuidv4(),
      },
      descSize: {
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
        id: uuidv4(),
      },
      titleWeight: {
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: false,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
        id: uuidv4(),
      },
      descWeight: {
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
        id: uuidv4(),
      },
      titleItalic: {
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: false,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
        id: uuidv4(),
      },
      descItalic: {
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
        id: uuidv4(),
      },
      titleColor: {
        status: '#000',
        isShow: false,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
        id: uuidv4(),
      },
      descColor: {
        status: '#909399',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
        id: uuidv4(),
      },
    },
  }
}
