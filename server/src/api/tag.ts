import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'

// 新增
export function addTag<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/addTag', data)
}
// 删除
export function delTag<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/delTag', { params: data })
}
// 修改
export function updateTag<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/updateTag', data)
}
// 分页查询
export function findTag<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/findTag', { params: data })
}

