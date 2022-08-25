import { createStore } from 'vuex'
import article from './modules/article'
import initData from './modules/initData'

// export default createStore({
//     state: {},
//     mutations: {},
//     actions: {},
//     modules: {
//         article
//     }
// })

export default function () {
    return createStore({
        state: {},
        mutations: {},
        actions: {},
        modules: {
            article,
            initData
        }
    })
}
