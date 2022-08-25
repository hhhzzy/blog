<template>
    <div class="title">{{ state.result.name }}</div>
    <div class="list-bottom">
        <ul>
            <li>
                <svg-icon icon-class="calendar" />
                <span>{{ date_format(state.result.createdTime) }}</span>
            </li>
            <li>
                <svg-icon icon-class="time" />
                <span>{{ state.result.readtime }} min</span>
            </li>
            <li>
                <svg-icon icon-class="folder" />
                <span>{{ state.result.tag ? state.result.tag.toString() : '' }}</span>
            </li>
        </ul>
    </div>
    <v-md-preview :text="state.markdown" ref="markdown" />
</template>
<script lang="ts" setup>
    import { reactive, onBeforeMount, ref, nextTick } from 'vue'
    import { GetArticleInfo } from '@/api/article'
    import { date_format } from '@/utils/validate'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    const route = useRoute() // 当前路由
    const state = reactive({
        markdown: '',
        id: route.query.id,
        result: {},
        titles: [{}]
    })
    const markdown = ref()
    const store = useStore()
    // 获取列表
    const GetInfo = async () => {
        const { data } = await GetArticleInfo({ id: state.id })
        if (data.code) {
            state.markdown = data.data.content
            state.result = data.data
            nextTick(() => {
                const anchors = (markdown.value as any).$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
                // 图片没加载完成，通过getBoundingClientRect().top获取的top值不对。优化.....
                setTimeout(() => {
                    store.dispatch('addtitles', anchors)
                    store.dispatch('addMarkdown', markdown)
                }, 100)
            })
        }
        console.log(state)
    }
    onBeforeMount(() => {
        console.log(store, store.state.article.titles, 8888888)
        GetInfo()
    })
</script>

<style lang="scss" scoped>
    .title {
        color: #000;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
    }
    .list-bottom {
        ul {
            display: flex;
            li {
                color: #6c757d;
                font-size: 0.8rem;
                svg {
                    margin-right: 0.3rem;
                    font-size: 0.9rem;
                }
                span {
                    margin-right: 1.8rem;
                }
            }
        }
    }
    ::v-deep .github-markdown-body {
        padding-left: 0;
    }
</style>
