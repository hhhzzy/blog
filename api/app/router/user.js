'use strict';

module.exports = app => {
    const { router, controller } = app;
    // 后台接口
    router.post('/api/server/GetUserInfo', controller.user.findUser); // 查询用户信息
    router.post('/api/server/login', controller.user.login); // 登录
};