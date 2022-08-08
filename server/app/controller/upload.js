'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
    constructor(ctx) {
        super(ctx);
    }
    async uploadFile() {
        const { ctx } = this;
        // 获取文件
        const stream = await ctx.getFileStream();
        // 文件名
        const filename = new Date().getTime() + stream.filename;
        // 上传文件目录
        const uploadBasePath = 'app/public/uploads';

        await this.mkdirsSync(path.join(uploadBasePath));
        // 生成写入路径
        const target = path.join(uploadBasePath, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try{
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        }catch(err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            ctx.throw(500, err);
        }
        const res = {
            filename: filename,
            url: path.join('/public/uploads', filename).split(path.sep).join('/')
        };
        ctx.helper.success({ ctx, res });
    }

    // 判断是否有上传文件存放的文件夹，没有则生成
    async mkdirsSync(dirname) {
        if(fs.existsSync(dirname)) {
            return true;
        }else{
            if (this.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
}
module.exports = UploadController;