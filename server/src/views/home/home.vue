<template>
    <div class="">
        <h1 @click="login">欢迎光临</h1>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
@Component({
    name: 'Home'
})
export default class Home extends Vue {
    mounted() {
        console.log(store, 55)
    }
    private login() {
        this.$router.push({
            path: '/level/level_1/12313123/level_1_1'
        })
    }
}
</script>
