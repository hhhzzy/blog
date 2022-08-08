'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    constructor(ctx) {
        super(ctx);
    }
    // 查询用户信息
    async findUser() {
        const { ctx, service } = this;
        const res = await service.user.find();
        ctx.helper.success({ ctx, res });
    }
    // 登录
    async login() {
        const { ctx, service } = this;
        const res = await service.user.login(ctx.request.body);
        
        ctx.helper.success({ ctx, res });
    }
}

module.exports = HomeController;
