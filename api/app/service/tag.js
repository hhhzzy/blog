'use strict';
const Service = require('egg').Service;
class TagService extends Service {
    // 新增
    async add(payload) {
        const { ctx } = this;
        const re = await ctx.service.tag.findOne(payload.name);
        if(re) {
            ctx.throw(400, '该字典已存在！');
        }
        const res = await ctx.model.Tag.create(payload);
        return res;
    }

    // 修改
    async update(payload) {
        const { ctx } = this;
        const tag = await ctx.model.Tag.findOne({ _id: payload.id });
        if(!tag) {
            ctx.throw(400, '该数据不存在！');
        }
        const res = await ctx.model.Tag.findByIdAndUpdate(payload.id, payload);
        return res;
    }

    // 分页查询
    async pageList(payload) {
        const { currentPage, pageSize, name } = payload;
        const { ctx } = this;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        if(name) {
            res = await ctx.model.Tag.find({ name: { $regex: name } }).skip(skip).limit(Number(pageSize)).sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.Tag.count({ name: { $regex: name } }).exec();
        } else {
            res = await ctx.model.Tag.find({}).skip(skip).limit(Number(pageSize)).sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.Tag.count({}).exec();
        }
        return { count: count, result: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }

    // 删除
    async del(payload) {
        const { id } = payload;
        const { ctx } = this;
        const res = await ctx.model.Tag.deleteOne({ _id: payload.id });
        return res;
    }
    // 查找
    async findOne(name) {
        return await this.ctx.model.Tag.findOne({ name: name });
    }
}
module.exports = TagService;