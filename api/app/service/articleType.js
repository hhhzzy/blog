'use strict';
const Service = require('egg').Service;
class ArticleTypeService extends Service {
    // 新增
    async add(payload) {
        const { ctx }= this;
        const articleType = await ctx.model.ArticleType.findOne({ name: payload.name });
        if(articleType) {
            ctx.throw(400, '该文章类型已存在');
        }
        const res = await ctx.model.ArticleType.create(payload);
        return res;
    }
    // 分页查询
    async pageList(payload) {
        const { currentPage, pageSize, name, tag = '' } = payload;
        const { ctx } = this;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        if(name) {
            res = await ctx.model.ArticleType.find({ name: { $regex: name } }).skip(skip).limit(Number(pageSize)).sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.ArticleType.count({ name: { $regex: name } }).exec();
        } else {
            res = await ctx.model.ArticleType.find({ }).skip(skip).limit(Number(pageSize)).sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.ArticleType.count({ }).exec();
        }
        return { count: count, result: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }
    // 修改
    async update(payload) {
        const { ctx } = this;
        const tag = await ctx.model.ArticleType.findOne({ _id: payload.id });
        if(!tag) {
            ctx.throw(400, '该数据不存在！');
        }
        const res = await ctx.model.ArticleType.findByIdAndUpdate(payload.id, payload);
        return res;
    }
    //查找
    async find(id) {
        return await this.ctx.model.ArticleType.findOne({ _id: id });
    }
    // 删除
    async del(payload) {
        const { id } = payload;
        const { ctx } = this;
        const res = await ctx.model.ArticleType.deleteOne({ _id: payload.id });
        return res;
    }

}
module.exports = ArticleTypeService;