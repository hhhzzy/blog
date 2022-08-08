const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: false, // 配置打包完成后是否显示出console.log()输出的文件行数
    configureWebpack: {
        // 文件夹通过@定位到src
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'async', // 只处理异步 chunk，这里两个缓存组都另配了 chunks，那么就被无视了
                minSize: 30000, // 允许新拆出 chunk 的最小体积
                maxSize: 0, // 旨在与 HTTP/2 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度。
                minChunks: 1, // 拆分前被 chunk 公用的最小次数
                maxAsyncRequests: 5, // 每个异步加载模块最多能被拆分的数量
                maxInitialRequests: 3, // 每个入口和它的同步依赖最多能被拆分的数量
                automaticNameDelimiter: '~',
                cacheGroups: {
                    // 缓存组
                    vendors: {
                        name: `chunk-vendors`,
                        test: /[\\/]node_modules[\\/]/,
                        priority: 1, // 缓存组权重，数字越大优先级越高
                        chunks: 'initial', // 只处理初始 chunk
                        reuseExistingChunk: true, // 为true时，如果当前要打包的模块已经被打包就重用该模块，不会重新打包生成新的js文件
                        enforce: true // 为true时，忽略minSize，minChunks，maxAsyncRequests和maxInitialRequests外面选项
                    },
                    elementUI: {
                        name: 'chunk-elementui',
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                        chunks: 'all',
                        priority: 2,
                        reuseExistingChunk: true, // 为true时，如果当前要打包的模块已经被打包就重用该模块，不会重新打包生成新的js文件
                        enforce: true // 为true时，忽略minSize，minChunks，maxAsyncRequests和maxInitialRequests外面选项
                    },
                    common: {
                        name: `chunk-common`,
                        minChunks: 3, // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
                        priority: -20,
                        chunks: 'initial', // 只针对同步 chunk
                        reuseExistingChunk: true, // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
                        enforce: true // 为true时，忽略minSize，minChunks，maxAsyncRequests和maxInitialRequests外面选项
                    }
                }
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, 'src/styles/_variables.less')
            ]
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://www.mock.com', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        open: true
    }
}
