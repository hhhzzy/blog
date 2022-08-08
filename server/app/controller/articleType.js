'use strict';

const Controller = require('egg').Controller;

class ArticleTypeController extends Controller {
    constructor(ctx) {
        super(ctx);
    }
    // 新增
    async addArticleType() {
        const { ctx } = this;
        const res = await ctx.service.articleType.add(ctx.request.body);
        this.ctx.helper.success({ ctx, res });
    }
    // 分页查询
    async pageList() {
        const  { ctx } = this;
        const res = await ctx.service.articleType.pageList(ctx.query);
        this.ctx.helper.success({ ctx, res });
    }
    // 查询详情
    async detailArticleType() {
        const { ctx } = this;
        const res = await ctx.service.articleType.find(ctx.query.id);
        this.ctx.helper.success({ ctx, res });
    }
    // 修改
    async updateArticleType() {
        const { ctx, service } = this;
        const res =await service.articleType.update(ctx.request.body);
        ctx.helper.success({ ctx });
    }
    // 删除
    async delArticleType() {
        const { ctx, service } = this;
        const res = await service.articleType.del(ctx.query);
        ctx.helper.success({ ctx });
    }
}
module.exports = ArticleTypeController;