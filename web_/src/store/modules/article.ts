const state = {
    titles: [],
    markdown: {}
}

const mutations = {
    ADD_TITLES(state: any, data: any) {
        console.log(state, data, 12346)
        state.titles = data
    },
    ADD_MARKDOWN(state: any, data: any) {
        state.markdown = data
    }
}
const actions = {
    addtitles: ({ commit }: any, state: any) => {
        console.log(state, 987654)
        commit('ADD_TITLES', state)
    },
    addMarkdown: ({ commit }: any, state: any) => {
        console.log(state, 987654)
        commit('ADD_MARKDOWN', state)
    }
}
export default {
    state,
    mutations,
    actions
}
