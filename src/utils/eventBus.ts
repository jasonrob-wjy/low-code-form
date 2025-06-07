import mitt from 'mitt'
import type { Events } from '@/types'
const emitter = mitt<Events>()
export default emitter
