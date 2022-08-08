'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
    constructor(ctx) {
        super(ctx);
        
        this.tagRule = {
            name: { type: 'string', required: true }
        };
    }
    // 新增tag
    async addTag() {
        const { ctx, service } = this;
        // 校检参数
        ctx.validate(this.tagRule);
        const res = await service.tag.add(ctx.request.body);
        ctx.helper.success({ ctx, res });
    }
    // 删除
    async delTag() {
        const { ctx, service } = this;
        const res = await service.tag.del(ctx.query);
        ctx.helper.success({ ctx });
    }
    // 修改
    async updateTag() {
        const { ctx, service } = this;
        const res =await service.tag.update(ctx.request.body);
        ctx.helper.success({ ctx });
        
    }
    // 分页查询
    async pageList() {
        const { ctx, service } = this;
        const res = await service.tag.pageList(ctx.query);
        ctx.helper.success({ ctx, res });
    }
}
module.exports = TagController;