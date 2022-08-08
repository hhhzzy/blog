import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'
import { ISearchResultData } from '@/api/types'

// 新增
export function addArticle<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/addArticle', data)
}
// 分页查询
export function findArticle<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/findArticle', { params: data })
}
// 查询详情
export function getInfo<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/detailArticle', { params: data })
}
// 查询详情
export function updateArticle<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/updateArticle', data)
}
// 删除
export function delArticle<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/delArticle', { params: data })
}
// 获取文章分类
export function findArticleType<T>(data: T) {
    return Ajax.get<ResponseData<ISearchResultData>>('/api/server/findArticleType', { params: data })
}
// 新增文章分类
export function addArticleType<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/addArticleType', data)
}
// 修改文章分类
export function updateArticleType<T>(data: T) {
    return Ajax.post<ResponseData<T>>('/api/server/updateArticleType', data)
}
// 删除文章分类
export function delArticleType<T>(data: T) {
    return Ajax.get<ResponseData<T>>('/api/server/delArticleType', { params: data })
}
