<template>
    <div class="sider-bar-box">
        <div class="people-box">
            <a href="javascript:;" class="user-a">
                <img src="@/assets/user.webp" alt="" />
            </a>
            <p class="name">HZY</p>
            <p class="word">一个简单的描述</p>
        </div>
        <div class="nav-box">
            <ul>
                <li v-for="(item, index) in routes" :key="index">
                    <router-link :to="item.path" v-if="!item.meta.hidden" :class="[item.redirect == activeMenu ? 'current' : '']">
                        <svg-icon :icon-class="item.meta.icon" />
                        {{ item.meta.title ? item.meta.title : '自定义' }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, computed } from 'vue'
    import { routes } from '@/router/index'
    import { useRoute } from 'vue-router'
    // 获取当前页面路由，判断当前页面的地址和导航的路由是否一样，高亮显示
    const route = useRoute()
    const activeMenu = computed(() => {
        const { path } = route
        return path
    })
    onMounted(() => {
        console.log(routes, useRoute())
    })
</script>

<style lang="scss" scoped>
    .sider-bar-box {
        width: 260px;
        background-color: #eeeeee;
        height: 100%;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        .people-box {
            margin-top: 4rem;
            margin-bottom: 1rem;
            width: 100%;
        }
        .user-a {
            width: 95px;
            height: 95px;
            overflow: hidden;
            border-radius: 50%;
            display: block;
            border: 2px solid rgba(222, 222, 222, 0.7);
            margin-left: 4.5rem;
            img {
                width: 95px;
                height: 95px;
                transition: transform 0.5s;
            }
            &:hover img {
                transform: scale(1.2);
            }
        }
        .name {
            font-size: 1.7rem;
            color: #868585;
            font-weight: 900;
            letter-spacing: 1px;
            transition: color 0.35s ease-in-out;
            cursor: pointer;
            margin-left: 4.5rem;
            margin-top: 1rem;
            &:hover {
                color: #424242;
            }
        }
        .word {
            margin-top: 0.3rem;
            margin-left: 4.5rem;
            color: #a2a19f;
            min-height: 3rem;
            word-spacing: 0;
            line-height: 1.2rem;
            font-style: italic !important;
        }
        .nav-box {
            width: 100%;
            ul {
                margin-left: 4rem;
                li {
                    cursor: pointer;
                    vertical-align: middle;
                    a {
                        padding: 1rem 0;
                        display: block;
                        color: #757575e6;
                        font-size: 0.95rem;
                        letter-spacing: 2px;
                        font-weight: 600;
                        transition: color 0.35s ease-in-out;
                        &:hover {
                            color: #424242;
                        }
                        &.current {
                            color: #424242;
                        }
                    }
                    .svg-icon {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>
