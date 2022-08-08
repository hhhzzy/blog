'use strict';

module.exports = app => {
    const { router, controller } = app;
    // 后台接口
    router.post('/api/upload', controller.upload.uploadFile); // 上传
};