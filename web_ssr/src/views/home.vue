<template>
    <div>
        <Article />
    </div>
</template>
<script lang="ts">
    import Article from '@/views/article/list.vue'
    // import { computed } from 'vue'
    // import { useStore } from 'vuex'
    export default {
        components: { Article },
        // setup() {
        //     const store = useStore()
        //     const data = computed(() => {
        //         console.log(store.state, 9999)
        //         return store.state
        //     })
        //     return {
        //         data
        //     }
        // },
        asyncData(store: any, route: any) {
            // console.log(store, route, 55)
            return store.dispatch('initData/homeInitData', { pageSize: 10, currentPage: 1 })
        }
    }
</script>
