import {
    createRouter,
    // createWebHashHistory,
    RouteRecordRaw,
    createWebHistory
} from 'vue-router'
// import Home from '../views/Home.vue'

export const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
        meta: {
            title: '首页',
            icon: 'home'
        },
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/home.vue')
            }
        ]
    },
    {
        path: '/article',
        component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
        meta: {
            title: '文章',
            hidden: true
        },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('../views/article/list.vue')
            },
            {
                path: 'detail',
                name: 'detail',
                component: () => import('../views/article/detail.vue')
            },
            {
                path: 'classify',
                name: 'classify',
                component: () => import('../views/article/classify.vue')
            }
        ]
    },
    {
        path: '/categories',
        component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
        meta: {
            title: '分类',
            icon: 'categories'
        },
        redirect: '/categories/index',
        children: [
            {
                path: 'index',
                name: 'categories',
                component: () => import('../views/categories/index.vue')
            }
        ]
    },
    {
        path: '/tags',
        component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
        meta: {
            title: '标签',
            icon: 'tags'
        },
        redirect: '/tags/index',
        children: [
            {
                path: 'index',
                name: 'tags',
                component: () => import('../views/tags/index.vue')
            }
        ]
    },
    // {
    //     path: '/archive',
    //     component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
    //     meta: {
    //         title: '档案',
    //         icon: 'archive'
    //     },
    //     redirect: '/archive/index',
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'archive',
    //             component: () => import('../views/archive/index.vue')
    //         }
    //     ]
    // },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
        meta: {
            title: 'About',
            icon: 'about'
        },
        redirect: '/about/index',
        children: [
            {
                path: 'index',
                name: 'about',
                component: () => import('../views/about.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 路由切换，简单的让页面滚动到顶部
        return { top: 0 }
    }
})

export default router
