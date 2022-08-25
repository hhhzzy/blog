<template>
    <h1>标签</h1>
    <div class="tags-box">
        <router-link :to="'/article/list?tag=' + item.name" v-for="item in state.tagList" :key="item.id">{{ item.name }}</router-link>
    </div>
</template>
<script lang="ts" setup>
    import { onBeforeMount, reactive } from 'vue'
    import { GetTagList } from '@/api/tags'
    const state = reactive({
        tagList: [],
        searchForm: {
            pageSize: 10,
            currentPage: 1
        }
    })
    const GetTag = async () => {
        const { data } = await GetTagList(state.searchForm)
        if (data.code) {
            state.tagList = data.data.result
        }
    }
    onBeforeMount(() => {
        GetTag()
    })
</script>
<style lang="scss" scoped>
    h1 {
        font-size: 1.9rem;
        font-weight: 400;
    }
    .tags-box {
        margin-top: 3rem;
        a {
            border-radius: 0.7em;
            padding: 6px 8px 7px;
            margin-right: 0.8rem;
            line-height: 3rem;
            letter-spacing: 0;
            border: 1px solid #dee2e6;
            box-shadow: 0 0 3px 0 #e9ecef;
            font-size: 1rem;
            color: #2a408e;
        }
    }
</style>
