import createApp from './createApp'
// import createRouter from './router/index.ts'
// import createStore from './store/index.ts'
import { createWebHistory } from 'vue-router'

// 针对客户端的启动逻辑......
const { app, router, store } = createApp(createWebHistory())

// const router = createRouter(createWebHistory())
// const store = createStore()
// 判断window.__INITIAL_STATE__是否存在，存在的替换store的值
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
// app.use(router).use(store)

// 这里假设 App.vue 模板的根元素有 `id="app"`
router.isReady().then(() => {
    // 待优化：待做客户端数据预取......
    router.beforeResolve((to, from, next) => {
        // 触发匹配组件中的sayncData函数
        // const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))
        const matchedComponents = to.matched
        // 匹配不到的路由，执行 reject 函数，并返回 404
        if (!matchedComponents.length) {
            next()
        }
        let diffed = false
        // typescript模式下需要从options中取组件
        const activated = matchedComponents.filter((c, i) => {
            return diffed || (diffed = c.path === to.path)
        })
        const asyncDataHooks = activated.map(c => c.components.default.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        Promise.all(asyncDataHooks.map(hook => hook(store, router)))
            .then(() => {
                next()
            })
            .catch(next)
    })
    app.mount('#app')
})
