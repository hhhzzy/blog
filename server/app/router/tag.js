'use strict';

module.exports = app => {
    const { router, controller } = app;
    // 后台接口
    router.post('/api/server/addTag', controller.tag.addTag); // 新增
    router.get('/api/server/delTag', controller.tag.delTag); // 删除
    router.post('/api/server/updateTag', controller.tag.updateTag); // 修改
    router.get('/api/server/findTag', controller.tag.pageList); // 分页查询

    // 前端接口
    router.get('/api/web/findTag', controller.tag.pageList); // 分页查询

};