/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1648696582234_920';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
    // myAppName: 'egg',
    };

    // 加载 errorHandler 中间件
    config.middleware = ['errorHandler'];
    // 只对 /api 前缀的 url 路径生效
    config.errorHandler = {
        match: '/api',
    };

    // 配置mongoose数据库
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/blog',
        options: {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            bufferMaxEntries: 0,
            useUnifiedTopology: true
        },
    };
    // 允许跨域访问,关闭csrf认证
    config.security = {
        domainWhiteList: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'], // 设置允许域名访问白名单
        csrf: {
            enable: false
        }
    };
    // 配置跨域
    config.cors = {
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
    };
    // 配置jwt 注：match，ignore 不能同时使用
    config.jwt = {
        secret: 'Great4-M', // 加密秘钥
        enable: true, // 默认是关闭，如果开启，这会对所有请求进行自动校验
        // match: '/api/server', // 配置/api/server下的接口都需要验证
        ignore: ctx => {  // 设置符合某些规则的请求不经过这个中间件
            return ctx.path.indexOf('login') >= 0 ||  ctx.path.indexOf('api/upload') >=0 ||  ctx.path.indexOf('api/web') >=0;
        } 
    };
    // 文件上传
    config.multipart = {
        // 表单 Field 文件名长度限制
        fieldNameSize: 100,
        // 表单 Field 内容大小
        fieldSize: '100kb',
        // 表单 Field 最大个数
        fields: 10,

        // 单个文件大小
        fileSize: '10mb',
        // 允许上传的最大文件数
        files: 10,
    };
    return {
        ...config,
        ...userConfig,
    };
};
