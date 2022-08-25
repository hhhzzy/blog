// import ajax from '@/utils/http'
const ajax = require('@/utils/http')
import { GetArticleTypeList } from '@/api/article'
const state = {
    homeInitData: {
        ListData: []
    },
    categoriesInitData: {
        ListData: []
    }
}

const mutations = {
    HOME_INIT_DATA(state: any, data: any) {
        state.homeInitData.ListData = data
    },
    CATEGORIES_INIT_DATA(state: any, data: any) {
        state.categoriesInitData.ListData = data
    }
}
const actions = {
    // 首页初始数据
    homeInitData: ({ commit }: any, data: any) => {
        return new Promise((resolve, reject) => {
            console.log(555555)
            ajax.default.get('/api/web/findArticle', { params: data }).then((result: any) => {
                commit('HOME_INIT_DATA', result.data.data)
                console.log(66666)
                resolve(true)
            })
        })
    },
    // 分类页初始化数据
    categoriesInitData: async ({ commit }: any, searchData: any) => {
        const { data } = await GetArticleTypeList(searchData)
        console.log(data, 555555)
        commit('CATEGORIES_INIT_DATA', data.data)
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
