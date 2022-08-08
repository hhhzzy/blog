'use strict';

module.exports = app => {
    const { router, controller } = app;
    // 后台接口
    router.post('/api/server/addArticle', controller.article.addArticle); // 新增
    router.get('/api/server/findArticle', controller.article.pageList); // 分页查询
    router.get('/api/server/detailArticle', controller.article.detailArticle); // 查询详情
    router.post('/api/server/updateArticle', controller.article.updateArticle); // 修改
    router.get('/api/server/delArticle', controller.article.delArticle); // 删除
    // 文章分类
    router.post('/api/server/addArticleType', controller.articleType.addArticleType); // 新增
    router.get('/api/server/findArticleType', controller.articleType.pageList); // 分页查询
    router.post('/api/server/updateArticleType', controller.articleType.updateArticleType); // 修改
    router.get('/api/server/delArticleType', controller.articleType.delArticleType); // 删除

    // 前端接口
    router.get('/api/web/findArticle', controller.article.pageList); // 分页查询
    router.get('/api/web/detailArticle', controller.article.detailArticle); // 查询详情
    // 文章分类
    router.get('/api/web/findArticleType', controller.articleType.pageList); // 分页查询
    router.get('/api/web/typeGroupList', controller.article.typeGroupList); // 分页查询

};