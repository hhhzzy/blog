<template>
    <div class="article-list-box" v-for="item in stateList" :key="item.id">
        <p class="name">
            <router-link :to="'/article/detail?id=' + item.id">{{ item.name }}</router-link>
        </p>
        <p class="content">
            {{ item.summary }}
        </p>
        <div class="list-bottom">
            <ul>
                <li>
                    <svg-icon icon-class="calendar" />
                    <span>{{ date_format(item.createdTime, 'YYYY-MM-DD HH:MM:SS') }}</span>
                </li>
                <li>
                    <svg-icon icon-class="time" />
                    <span>{{ item.readtime }} min</span>
                </li>
                <li>
                    <svg-icon icon-class="folder" />
                    <span>{{ item.tag.toString() }}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="pagation-box" v-if="stateList.length">
        <ul>
            <li class="prev" @click="JumpPage('prev')"><img src="../../assets/prev.png" alt="" srcset="" /></li>
            <li :class="[state.searchForm.currentPage == item ? 'current' : '']" @click="JumpPage('page', item)" v-for="item in statePageNum" :key="item">{{ item }}</li>
            <li class="next" @click="JumpPage('next')"><img src="../../assets/next.png" alt="" srcset="" /></li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { reactive, onBeforeMount, computed } from 'vue'
    import { GetArticleList } from '@/api/article'
    import { date_format } from '@/utils/validate'
    import { onBeforeRouteUpdate, useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const state = reactive({
                list: [],
                count: 1,
                searchForm: {
                    pageSize: 10,
                    currentPage: 1,
                    tag: '',
                    type: ''
                },
                pagation: {
                    pageNum: 1 // 总共有多少页
                }
            })

            // 获取列表
            const GetList = async () => {
                const { data } = await GetArticleList(state.searchForm)
                if (data.code) {
                    state.list = data.data.result
                    state.count = data.data.count
                    state.pagation.pageNum = Math.ceil(state.count / state.searchForm.pageSize)
                }
            }

            // 页面跳转
            const JumpPage = async (type: string, num: number) => {
                // 上一页
                if (type === 'prev') {
                    if (state.searchForm.currentPage > 1) {
                        state.searchForm.currentPage -= 1
                    }
                } else if (type === 'next') {
                    if (state.searchForm.currentPage < state.pagation.pageNum) {
                        state.searchForm.currentPage += 1
                    }
                } else {
                    state.searchForm.currentPage = num
                }
                // 调用接口
                GetList()
            }
            onBeforeRouteUpdate(to => {
                state.searchForm.tag = to.query.tag as string
                state.searchForm.type = to.query.type as string
                GetList()
            })
            // 获取热门标签列表
            onBeforeMount(() => {
                state.searchForm.tag = route.query.tag as string
                state.searchForm.type = route.query.type as string
                GetList()
            })
            const stateList = computed(() => {
                if (state.list && state.list.length) {
                    return state.list
                } else {
                    return store.state.initData.homeInitData.ListData.result
                }
            })
            const statePageNum = computed(() => {
                return Math.ceil(store.state.initData.homeInitData.ListData.count / state.searchForm.pageSize)
            })
            return {
                stateList,
                JumpPage,
                state,
                date_format,
                statePageNum
            }
        },
        asyncData(store: any, route: any) {
            return store.dispatch('initData/homeInitData')
        }
    }
</script>

<style lang="scss" scoped>
    .article-list-box {
        padding: 0 0 1rem 0;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 1.5rem;
        .name {
            a {
                color: #2a408e;
                font-size: 1.4rem;
                font-weight: 400;
                &:hover {
                    color: #d2603a !important;
                    border-bottom: 1px solid #d2603a;
                    text-decoration: none;
                }
            }
        }
        .content {
            margin: 0.6rem 0;
            color: #696969;
            font-size: 1.03rem;
            word-wrap: break-word;
            line-height: 1.8;
            height: 4rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
    }
    .pagation-box {
        ul {
            li {
                float: left;
                width: 32px;
                height: 32px;
                border: 1px solid #eeeeee;
                border-radius: 50%;
                text-align: center;
                line-height: 32px;
                margin-right: 10px;
                color: #6c757d;
                cursor: pointer;
                img {
                    width: 20px;
                    margin: 0 auto;
                    vertical-align: middle;
                    margin-bottom: 5px;
                }
                &.current {
                    background-color: #eeeeee;
                }
            }
        }
    }
</style>
