import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

const req = require.context('./svg', false, /\.svg$/)
const requireAll = function (requireContext: any) {
    return requireContext.keys().map(requireContext)
}
requireAll(req)
// register globally
export default function (app: ReturnType<typeof createApp>) {
    app.component('svg-icon', SvgIcon)
}
