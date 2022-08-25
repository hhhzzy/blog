import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/normalize.css' // 引入初始化样式
import '@/styles/index.scss' // 引入全局样式
// markdown渲染v-md-editor
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// 显示代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
    Hljs: hljs
})
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createEmojiPlugin())
VMdPreview.use(createCopyCodePlugin())

import iconSvg from '@/icons/index'
const app = createApp(App)
// 加载全局svg
iconSvg(app)

app.use(store).use(router).use(VMdPreview).mount('#app')
