import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from 'vue-svgicon'
import '@/icons/components'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import '@/styles/index.less'
// 全局过滤
import * as filters from '@/filters/index'
Object.keys(filters).forEach((key: any) => Vue.filter(key, (filters as any)[key]))

// require('../mock/mock')
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    defaultWidth: '1em',
    defaultHeight: '1em'
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
