import Ajax from '@/utils/http'
// 分页查询
export function GetArticleList(data: any) {
    return Ajax.get('/api/web/findArticle', { params: data })
}
// 查询详情
export function GetArticleInfo(data: any) {
    return Ajax.get('/api/web/detailArticle', { params: data })
}
// 查询文章分类
export function GetArticleTypeList(data: any) {
    return Ajax.get('/api/web/typeGroupList', { params: data })
}
