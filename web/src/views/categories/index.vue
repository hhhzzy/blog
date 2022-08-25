<template>
    <h1>分类</h1>
    <ul class="categories-ul">
        <li v-for="item in state.list" :key="item.id" @click="GotoDetail(item._id._id)">
            <svg-icon icon-class="folder_1" />
            <a>{{ item._id.name }}</a>
            <i>{{ item.count }} posts</i>
        </li>
    </ul>
</template>
<script lang="ts" setup>
    import { reactive, onBeforeMount } from 'vue'
    import { GetArticleTypeList } from '@/api/article'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const state = reactive({
        list: [],
        searchForm: {
            pageSize: 100,
            currentPage: 1
        }
    })
    // 进入详情
    const GotoDetail = async (id: string) => {
        console.log(4)
        router.push({
            path: '/article/list',
            query: {
                type: id
            }
        })
    }
    // 获取列表
    const GetList = async () => {
        const { data } = await GetArticleTypeList(state.searchForm)
        if (data.code) {
            state.list = data.data.result
        }
    }
    // 获取热门标签列表
    onBeforeMount(() => {
        GetList()
    })
</script>
<style lang="scss" scoped>
    h1 {
        font-size: 1.9rem;
        font-weight: 400;
    }
    .categories-ul {
        margin-top: 3rem;
        li {
            padding: 0.75rem 1.25rem;
            border: 1px solid rgba(0, 0, 0, 0.125);
            height: 2rem;
            line-height: 2rem;
            border-top: none;
            &:first-child {
                border-top: 1px solid rgba(0, 0, 0, 0.125);
            }
            svg {
                color: #808080;
                font-size: 0.9rem;
            }
            a {
                color: #2a408e;
                cursor: pointer;
                font-size: 1rem;
                margin: 0 0.8rem;
            }
            i {
                font-size: 0.6rem;
                color: #6c757d !important;
                font-style: normal;
            }
        }
    }
</style>
