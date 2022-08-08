'use strict';
const Service = require('egg').Service;

class UserService extends Service {

    async login(payload) {
        const { ctx } = this;
        const res = await ctx.model.User.findOne({ username: payload.username });
        if(!res || payload.password != res.password) {
            ctx.throw(400, '用户名或者密码错误！');
        }
        // 返回生成的token
        return { token: await ctx.service.actionToken.jwtToken(res._id) };
    }

    async find() {
        const { ctx } = this;
        // 可以通过ctx.state.user获取前端传过来的已经解析过后的token，egg-jwt中间件已经把token解析并存入了ctx.state.user
        const id = ctx.state.user.data.id;
        return await this.ctx.model.User.findById(id, { password: 0 });
    }
   
}

module.exports = UserService;