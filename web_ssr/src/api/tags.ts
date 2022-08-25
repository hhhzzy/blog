import Ajax from '@/utils/http'
// 获取tag标签
export function GetTagList(data: object) {
    return Ajax.get('/api/web/findTag', { params: data })
}
