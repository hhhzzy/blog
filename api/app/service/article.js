'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
    // 新增
    async add(payload) {
        const { ctx }= this;
        const article = await ctx.model.Article.findOne({ name: payload.name });
        if(article) {
            ctx.throw(400, '该文章已存在');
        }
        const res = await ctx.model.Article.create(payload);
        return res;
    }
    // 分页查询
    async pageList(payload) {
        const { currentPage, pageSize, name, tag='', type  } = payload;
        const { ctx } = this;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        console.log(payload, 44444444);
        let filter = {};
        if(name ) filter = { name: { $regex: `${name}` } }; 
        if(tag) filter = Object.assign({}, filter, { tag: { $elemMatch: { $regex: `${tag}`, $options: '$i' } } });
        if(type) filter = Object.assign({}, filter, { type: type });
        
        if(name || type || tag) {
            res = await ctx.model.Article.find(filter).skip(skip).limit(Number(pageSize)).populate('articleType').populate('type').sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.Article.count(filter).exec();
        } else {
            console.log(filter, 5555555);
            res = await ctx.model.Article.find({}).populate('type').skip(skip).limit(Number(pageSize)).sort({ createdTime: -1 }).exec();
            count = await this.ctx.model.Article.count({}).exec();
        }
        return { count: count, result: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }
    // 根据分类统计分组统计查询
    async typeGroupList() {
        let res = [];
        res = await this.ctx.model.Article.aggregate(
            [
                {
                    $lookup: {
                        from: 'articletypes',
                        localField: 'type',
                        foreignField: '_id',
                        as: 'articleType'
                    }
                },
                {
                    $project: { articleType: 1 }
                },
                { '$unwind': '$articleType' },
                {
                    $group: { _id: '$articleType', count: { $sum: 1 } }
                },
            ]
        );
        console.log(res, 9999999999999999);
        return { result: res };
    }
    
    // 修改
    async update(payload) {
        const { ctx } = this;
        const tag = await ctx.model.Article.findOne({ _id: payload.id });
        if(!tag) {
            ctx.throw(400, '该数据不存在！');
        }
        const res = await ctx.model.Article.findByIdAndUpdate(payload.id, payload);
        return res;
    }
    //查找
    async find(id) {
        return await this.ctx.model.Article.findOne({ _id: id });
    }
    // 删除
    async del(payload) {
        const { id } = payload;
        const { ctx } = this;
        const res = await ctx.model.Article.deleteOne({ _id: payload.id });
        return res;
    }

}
module.exports = ArticleService;