<template>
    <div class="right-bar-box">
        <div class="recently-update">
            <p class="title">最近更新</p>
            <ul>
                <li v-for="item in state.list" :key="item.id">
                    <a :href="'/article/detail?id=' + item.id">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="trending-tags">
            <p class="title">热门标签</p>
            <ul>
                <li v-for="item in state.tagList" :key="item.id">
                    <router-link :to="'/article/list?tag=' + item.name" :class="[item.name == activeMenu ? 'current' : '']">{{ item.name }}</router-link>
                </li>
            </ul>
        </div>
        <div :class="['article-title-box', state.fixed ? 'article-title-fixed' : '']" v-if="activePath == '/article/detail'" ref="article">
            <p class="catalog-title" v-if="state.fixed">目录</p>
            <div class="article-title">
                <template v-for="(anchor, index) in state.titles" :key="index">
                    <p
                        :class="[anchor.top < state.windowTop + 70 && state.windowTop + 70 < state.titles[index + 1].top ? 'current' : '']"
                        :style="{ padding: `0 0 0 ${anchor.indent * 20}px` }"
                        v-if="index != state.titles.length - 1"
                        @click="handleAnchorClick(anchor)"
                    >
                        <a style="cursor: pointer">{{ anchor.title }}</a>
                    </p>
                    <p
                        @click="handleAnchorClick(anchor)"
                        :style="{ padding: `0 0 0 ${anchor.indent * 20}px` }"
                        :class="[anchor.top < state.windowTop + 70 && state.windowTop + 70 > state.titles[index].top ? 'current' : '']"
                        v-else
                    >
                        <a style="cursor: pointer">{{ anchor.title }}</a>
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { reactive, onBeforeMount, computed, watch, onMounted, ref, onBeforeUnmount } from 'vue'
    import { GetArticleList } from '@/api/article'
    import { GetTagList } from '@/api/tags'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    // 获取当前页面路由，判断当前页面的地址和导航的路由是否一样，高亮显示
    const route = useRoute()
    const store = useStore()
    const activeMenu = computed(() => {
        const { query } = route
        console.log(query, route, 2111111)
        return query.tag
    })
    const activePath = computed(() => {
        const { path } = route
        return path
    })
    console.log(activeMenu, 898989898989)
    const state = reactive({
        tagList: [],
        list: [],
        searchForm: {
            pageSize: 5,
            currentPage: 1
        },
        titles: [{}],
        fixed: false, // 右边标题栏是否固定
        aT: 0, // 右边标题栏的初始高度
        windowTop: 0 // 滚轮的高度
    })
    const article = ref(null)

    // 获取列表
    const GetList = async () => {
        const { data } = await GetArticleList(state.searchForm)
        if (data.code) {
            state.list = data.data.result
        }
    }
    const GetTag = async () => {
        const { data } = await GetTagList(state.searchForm)
        if (data.code) {
            state.tagList = data.data.result
        }
    }
    // 点击标题滚动到对应的位置
    const handleAnchorClick = (anchor: any) => {
        const preview = store.state.article.markdown
        const { lineIndex } = anchor
        const heading = (preview as any).$el.querySelector(`[data-v-md-line="${lineIndex}"]`)
        console.log(preview, lineIndex, heading)
        if (heading) {
            ;(preview as any).scrollToTarget({
                target: heading,
                scrollContainer: window,
                top: 60
            })
        }
        // 点击标题高亮
    }
    const anchors = computed(() => store.state.article.titles)
    console.log(store.state.article.titles, anchors.value, 33333)
    // 监听store中的右侧标题栏的值
    watch(
        () => store.state.article.titles,
        newVal => {
            if (newVal) {
                const anchors = newVal
                ;(state.titles as any) = Array.from(anchors).filter((title: any) => !!title.innerText.trim())
                if (!state.titles.length) {
                    state.titles = []
                    return
                }
                const hTags = Array.from(new Set(state.titles.map((title: any) => title.tagName))).sort()
                state.titles = state.titles.map((el: any) => ({
                    title: el.innerText,
                    lineIndex: el.getAttribute('data-v-md-line'),
                    indent: hTags.indexOf(el.tagName),
                    top: el.getBoundingClientRect().top
                }))
                console.log(newVal, state.titles, 88877)
            }
        },
        { deep: true }
    )
    // 监听路由变化,绑定滚动事件
    watch(
        () => route.path,
        (newVal, oldVal) => {
            if (newVal === '/article/detail') {
                state.fixed = false
                state.windowTop = 0
                window.addEventListener('scroll', handleScrollY, true)
            }
        },
        { deep: true }
    )
    // 滚轮高度变化
    const handleScrollY = () => {
        // const preview = store.state.article.markdown
        if (!article.value) return
        const top = (article.value as any).getBoundingClientRect().top
        state.windowTop = window.scrollY
        if (top <= 90 && state.aT + 80 < state.windowTop) {
            state.fixed = true
        } else {
            state.fixed = false
        }
        console.log(top, state.fixed, window.scrollY, state.aT)
    }
    // 节流函数
    const throttle = (fn: any, tim: any) => {
        let bool = true
        return function (this: any) {
            if (!bool) return
            bool = false
            setTimeout(() => {
                fn.apply(this, arguments)
                bool = true
            }, tim)
        }
    }
    onBeforeMount(() => {
        GetList()
        GetTag()
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', () => {
            return
        }) // 离开当前组件别忘记移除事件监听
    })
    onMounted(() => {
        if (article.value) {
            window.addEventListener('scroll', throttle(handleScrollY, 80), true)
            state.aT = (article.value as any).getBoundingClientRect().top
        }
    })
</script>
<style lang="scss" scoped>
    .right-bar-box {
        position: relative;
        top: 48px;
        max-width: 300px;
        width: 25%;
        height: 100%;
        margin-left: 50px;
        .title {
            color: #616161;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.8rem;
        }
        ul {
            li {
                height: 1.8rem;
                line-height: 1.8rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                    color: rgb(108, 117, 125);
                    font-size: 0.9rem;
                    margin-left: 4px;
                }
            }
        }
        .recently-update,
        .trending-tags {
            margin-bottom: 4rem;
            border-left: 1px solid #f3f3f3;
            padding-left: 1rem;
        }
        .trending-tags {
            ul {
                overflow: hidden;
                li {
                    float: left;
                    margin-right: 5px;
                    cursor: pointer;
                    border-radius: 0.8rem;
                    border: 1px solid #e9ecef;
                    margin-bottom: 0.5rem;
                    a {
                        padding: 0 6px;
                        line-height: 25px;
                        height: 30px;
                        display: block;
                        overflow: hidden;
                        margin-left: 0;
                        transition: color 0.35s ease-in-out;
                    }
                    &:hover {
                        background-color: #005ebf;
                        a {
                            color: #fff;
                        }
                    }
                    .current {
                        background-color: #005ebf;
                        color: #fff;
                    }
                }
            }
        }
        .article-title-box {
            border-left: 1px solid #f3f3f3;
            padding-left: 1rem;
            P {
                padding: 0;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                a {
                    height: 30px;
                    overflow: hidden;
                    display: block;
                    color: #767676;
                    font-size: 0.8rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: calc(100% - 10px);
                }
            }

            .catalog-title {
                font-weight: 500;
                font-size: 16px;
                line-height: 2rem;
                color: #1d2129;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e4e6eb;
            }
            .current {
                a {
                    color: #3578e5;
                }
            }
        }
        .article-title-fixed {
            position: fixed;
            top: 80px;
            background-color: rgba(243, 243, 243, 0.5);
            padding-bottom: 1rem;
            padding-top: 10px;
            border: 1px solid #f3f3f3;
        }
    }
    /* 滚动条 */
    .article-title-fixed .article-title {
        height: 600px;
        overflow-y: auto;
        &::-webkit-scrollbar-thumb:horizontal {
            /*水平滚动条的样式*/
            width: 4px;
            background-color: #cccccc;
            -webkit-border-radius: 6px;
        }

        &::-webkit-scrollbar-track-piece {
            background-color: rgba(243, 243, 243, 0.5); /*滚动条的背景颜色*/
            -webkit-border-radius: 0; /*滚动条的圆角宽度*/
        }

        &::-webkit-scrollbar {
            width: 10px; /*滚动条的宽度*/
            height: 8px; /*滚动条的高度*/
        }

        &::-webkit-scrollbar-thumb:vertical {
            /*垂直滚动条的样式*/
            height: 50px;
            background-color: #999;
            -webkit-border-radius: 4px;
            outline: 2px solid #fff;
            outline-offset: -2px;
            border: 2px solid #fff;
        }

        &::-webkit-scrollbar-thumb:hover {
            /*滚动条的hover样式*/
            height: 50px;
            background-color: #9f9f9f;
            -webkit-border-radius: 4px;
        }
    }
</style>
