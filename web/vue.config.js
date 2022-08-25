var path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') // 引入gzip压缩插件
// 判断线上环境才需要配置cdn
const isProduction = process.env.NODE_ENV === 'production'

// cdn配置
const cdn = {
    // 排除的打包项
    externals: {
        axios: 'axios'
    },
    js: ['https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js']
}

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    // publicPath: './',
    productionSourceMap: false, // 配置打包完成后是否显示出console.log()输出的文件行数
    chainWebpack: config => {
        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config
            .plugin('html')
            .tap(args => {
                if (isProduction) args[0].cdn = cdn
                return args
            })
            .end()
    },
    configureWebpack: config => {
        if (isProduction) config.externals = cdn.externals
        if (isProduction) {
            // 通过splitChunks进行分包处理
            config.optimization = {
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
                            chunks: 'all', // 只处理初始 chunk
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        moment: {
                            name: `chunk-moment`,
                            test: /[\\/]node_modules[\\/]moment[\\/]/,
                            chunks: 'all',
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        highlight: {
                            name: `chunk-highlight`,
                            test: /[\\/]node_modules[\\/]highlight.js[\\/]lib[\\/]/,
                            chunks: 'all',
                            priority: 4,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        common: {
                            name: `chunk-common`,
                            minChunks: 2, // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
                            priority: 5,
                            chunks: 'initial', // 只针对同步 chunk
                            reuseExistingChunk: true // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
                        }
                    }
                }
            }
            config.plugins.push(
                new CompressionPlugin({
                    // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
                    filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
                    algorithm: 'gzip', // 官方默认压缩算法也是gzip
                    test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
                    threshold: 10240, // 以字节为单位压缩超过此大小的文件，使用默认值10240吧
                    minRatio: 0.8, // 最小压缩比率，官方默认0.8
                    // 是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
                    // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
                    deleteOriginalAssets: false
                })
            )
        }
    }
}
