import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Element Plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 引入样式
import './assets/css/index.scss'

// 引入 Font Awesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 将所有的 solid 图标添加到库中
library.add(fas)

const app = createApp(App)

// 注册 FontAwesomeIcon 组件
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
