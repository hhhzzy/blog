<template>
    <div class="top-bar-box">
        <div class="bread-box">
            <template v-for="(item, index) in state.breadcrumbs" :key="index">
                <router-link :to="item.path" :class="[state.breadcrumbs.length - 1 == index ? 'current' : '']">{{ item.meta.title }}</router-link>
                <i v-if="state.breadcrumbs && state.breadcrumbs.length > 1 && state.breadcrumbs.length - 1 != index">›</i>
            </template>
        </div>
        <div class="nav" @click="fun.triggerSiderbar">
            <svg-icon icon-class="nav" />
        </div>
        <div class="search-box">
            <svg-icon icon-class="search" />
            <input type="text" placeholder="Search..." />
        </div>
        <svg-icon icon-class="search" class="search-tigger" @click="fun.triggerSearch" />
        <div class="mini-search-box" v-if="showMiniSearch">
            <div class="mini-search">
                <svg-icon icon-class="search" />
                <input type="text" placeholder="Search..." />
            </div>
            <span class="cancel-search" @click="fun.triggerSearch">取消</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref, watch } from 'vue'
    import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
    const currentRoute = useRoute() // 当前的路由，类似于vue2.x的this.$route
    const router = useRouter() // 全局的路由实例，可以调用push、replace、go等方法
    console.log(currentRoute.path, currentRoute.matched, router)
    const showMiniSearch = ref(false)
    // 绑定导航点击事件
    const fun = reactive({
        triggerSiderbar() {
            if (!document.getElementsByTagName('body')[0].className) {
                document.getElementsByTagName('body')[0].className = 'siderbar-show'
            } else {
                document.getElementsByTagName('body')[0].removeAttribute('class')
            }
        },
        triggerSearch() {
            showMiniSearch.value = !showMiniSearch.value
        }
    })
    // 判断路由中是否有首页
    function isHomePage(route: RouteLocationMatched) {
        const name = route && route.name
        if (route.path === '/') {
            return true
        }
        if (!name) {
            return false
        }
        return (name as string).trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    }
    // 获取当前路由
    const state = reactive({
        breadcrumbs: [] as RouteLocationMatched[],
        getBreadcrumb: () => {
            let matched = currentRoute.matched.filter(item => item.meta && item.meta.title)
            if (!isHomePage(matched[0])) {
                console.log(matched)
                matched = [{ path: '/home', meta: { title: '首页' } } as unknown as RouteLocationMatched].concat(matched)
            }
            state.breadcrumbs = matched.filter(item => item.meta && item.meta.title)
            console.log(isHomePage(matched[0]), state.breadcrumbs, 8888)
        }
    })
    // 监听当前路由
    watch(
        () => currentRoute.path,
        (nowValue, oldValue) => {
            console.log(nowValue, nowValue.startsWith, oldValue)
            state.getBreadcrumb()
        }
    )
    onMounted(() => {
        state.getBreadcrumb()
    })
</script>

<style lang="scss" scoped>
    .top-bar-box {
        position: fixed;
        top: 0;
        left: 260px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        height: 48px;
        width: calc(100% - 260px - 3%);
        background-color: #fff;
        z-index: 99;
        display: flex;
        align-items: center;
        padding-left: 3%;
        .bread-box {
            width: 75%;
            max-width: 850px;
            a,
            i {
                font-size: 1rem;
                color: #2a408e;
                font-weight: 400;
            }
            i {
                margin: 0 0.5rem;
                font-style: normal;
            }
            a:hover {
                color: #d2603a;
                border-bottom: 1px solid #d2603a;
            }
            .current {
                color: #808080;
            }
        }
        .search-box {
            border: 1px solid #f5f5f5;
            background-color: #f5f5f580;
            border-radius: 2rem;
            padding-left: 5px;
            width: 25%;
            max-width: 300px;
            height: 32px;
            display: flex;
            align-items: center;
            svg {
                font-size: 1rem;
            }
            input {
                background-color: transparent;
                border: none;
                outline: none;
                margin-left: 3px;
                width: 95%;
            }
        }
        .nav {
            display: none;
            svg {
                font-size: 1.2rem;
                cursor: pointer;
                color: #999;
            }
        }
        .search-tigger {
            font-size: 1.2rem;
            cursor: pointer;
            color: #999;
            margin-right: 2%;
            display: none;
        }
        .mini-search-box {
            position: absolute;
            left: 0;
            top: 0;
            background-color: #fff;
            z-index: 100;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            height: 49px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.07);
            .mini-search {
                border: 1px solid #f5f5f5;
                background-color: #f5f5f580;
                width: 85%;
                padding: 0.3rem 0.5rem;
                border-radius: 5rem;
                input {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    margin-left: 3px;
                }
            }
            .cancel-search {
                color: #2a408e;
                cursor: pointer;
                font-weight: 500;
            }
        }
    }
</style>
