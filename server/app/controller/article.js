'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
    constructor(ctx) {
        super(ctx);
    }
    // 新增
    async addArticle() {
        const { ctx } = this;
        const res = await ctx.service.article.add(ctx.request.body);
        this.ctx.helper.success({ ctx, res });
    }
    // 分页查询
    async pageList() {
        const  { ctx } = this;
        const res = await ctx.service.article.pageList(ctx.query);
        this.ctx.helper.success({ ctx, res });
    }
    // 根据分类统计分组统计查询
    async typeGroupList() {
        const  { ctx } = this;
        const res = await ctx.service.article.typeGroupList();
        this.ctx.helper.success({ ctx, res });
    }

    // 查询详情
    async detailArticle() {
        const { ctx } = this;
        const res = await ctx.service.article.find(ctx.query.id);
        this.ctx.helper.success({ ctx, res });
    }
    // 修改
    async updateArticle() {
        const { ctx, service } = this;
        const res =await service.article.update(ctx.request.body);
        ctx.helper.success({ ctx });
    }
    // 删除
    async delArticle() {
        const { ctx, service } = this;
        const res = await service.article.del(ctx.query);
        ctx.helper.success({ ctx });
    }
}
module.exports = ArticleController;