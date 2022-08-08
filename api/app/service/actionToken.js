'use strict';

const  Service  = require('egg').Service;

class ActionTokenService extends Service {
    async jwtToken(_id) {
        const { ctx } = this;
        return ctx.app.jwt.sign({
            data: {
                id: _id
            },
            exp: Math.floor(Date.now() / 1000) + (1*60*60) // 过期时间：30分钟
        }, ctx.app.config.jwt.secret);
    }
}

module.exports = ActionTokenService;