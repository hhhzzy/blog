'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    // 配置egg-mongoose插件
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    // 配置跨域
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    // 配置jwt
    jwt: {
        enable: true,
        package: 'egg-jwt'
    },
    // 配置入参验证
    validate: {
        enable: true,
        package: 'egg-validate',
    }
};