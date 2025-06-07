import type { defineComponent } from 'vue'
import type { Material } from './material'
import type { OptionsProps, TextProps } from './editProps'

export type VueComType = ReturnType<typeof defineComponent>

export interface Status {
  type: VueComType
  name: Material
  id: string
  status: {
    [key: string]: TextProps | OptionsProps
  }
}
