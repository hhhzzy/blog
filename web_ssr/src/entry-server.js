import createApp from './createApp'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import { svgContent } from '@/icons/index'

export default function (context) {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(createMemoryHistory())
        // 注入svg-sprite-loader
        let symbolContent = ''
        svgContent.map(item => {
            symbolContent += item.default.content
        })
        const svgSymble = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" aria-hidden="true" id="__SVG_SPRITE_NODE__">
            ${symbolContent}
        </svg>`
        context.svgContent = svgSymble
        router.push(context.url)
        router.isReady().then(() => {
            // 触发匹配组件中的sayncData函数
            const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                })
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(
                matchedComponents.map(Component => {
                    if (Component.asyncData) {
                        return Component.asyncData(store, router.currentRoute)
                    }
                })
            )
                .then(async () => {
                    let html = await renderToString(app)
                    // 状态传递给renderer的上下文，注入到全局变量window.__INITIAL_STATE__中，方便后面客户端激活数据
                    html += `<script>window.__INITIAL_STATE__ = ${replaceHtmlTag(JSON.stringify(store.state))}</script>`
                    // Promise 应该 resolve 应用程序实例，以便它可以渲染
                    resolve(html)
                })
                .catch(reject)
        }, reject)
    })
}
/**
 * 替换标签
 * @param {*} html
 * @returns
 */
function replaceHtmlTag(html) {
    return html.replace(/<script(.*?)>/gi, '&lt;script$1&gt;').replace(/<\/script>/g, '&lt;script&gt;')
}
