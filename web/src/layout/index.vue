<template>
    <Siderbar />
    <Topbar />
    <div class="container-box">
        <div class="main-box">
            <router-view />
        </div>
        <Rightbar />
        <div class="back-top" @click="backTop" v-if="state.showBackTop"><img src="@/assets/backTop.png" alt="" /></div>
    </div>
</template>
<script lang="ts" setup>
    import Siderbar from './components/siderbar.vue'
    import Topbar from './components/topbar.vue'
    import Rightbar from './components/rightbar.vue'
    import { reactive, onMounted } from 'vue'
    const state = reactive({
        showBackTop: false
    })
    const backTop = () => {
        const timer = setInterval(function () {
            const osTop = document.documentElement.scrollTop || document.body.scrollTop
            const ispeed = Math.floor(-osTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            if (osTop === 0) {
                clearInterval(timer)
            }
        }, 30)
    }
    onMounted(() => {
        window.addEventListener(
            'scroll',
            function () {
                console.log(window.scrollY)
                if (window.scrollY > 100) {
                    state.showBackTop = true
                } else {
                    state.showBackTop = false
                }
            },
            true
        )
    })
</script>
<style lang="scss" scoped>
    .container-box {
        height: 100%;
        width: calc(100% - 260px - 3%);
        position: relative;
        margin-left: 260px;
        margin-top: 48px;
        display: flex;
        flex-wrap: wrap;
        padding-left: 3%;
        .main-box {
            max-width: 800px;
            width: calc(75% - 50px);
            margin-top: 48px;
            // padding-right: 50px;
        }
    }
    .back-top {
        width: 54px;
        height: 54px;
        -webkit-transition: transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
        box-shadow: 0 0 8px 0 #eaeaea;
        background-color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        position: fixed;
        right: 40px;
        bottom: 30px;
        cursor: pointer;
        img {
            vertical-align: middle;
        }
        &:hover {
            transform: translate3d(0, -5px, 0);
            -webkit-transform: translate3d(0, -5px, 0);
        }
    }
</style>
