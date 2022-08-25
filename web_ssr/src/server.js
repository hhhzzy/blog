const path = require('path')
const express = require('express')
const fs = require('fs')
const manifest = require('../dist/server/ssr-manifest.json')

const server = express()

// 获取html的函数
const appPath = path.join(__dirname, '../dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, '../dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, '../dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, '../dist/client', 'css')))
server.use('/favicon.ico', express.static(path.join(__dirname, '../dist/client', 'favicon.ico')))
server.use('/css', express.static(path.join(__dirname, '../dist/server', 'css')))

const indexTemplate = fs.readFileSync(path.join(__dirname, '../dist/client/index.html'), 'utf-8')

// 服务端加载的时候把css加载进去，避免首屏无样式闪烁问题
// 造成的问题：样式会重复
let _manifest
function renderCss(fileName) {
    const filePath = _manifest.get(fileName)
    if (!filePath) {
        return ''
    }

    return `<link rel="stylesheet" href="${filePath}">\n`
}

server.get('*', async (req, res) => {
    // 获取模板
    const appContent = await createApp(req)
    _manifest = new Map(Object.entries(manifest))
    const head = renderCss('app.css')
    // 获取svg图片
    // 注入svg-sprite-loader  注入window.__INITIAL_STATE__
    const html = indexTemplate.toString().replace('</head>', `</head>${head}`).replace('<body>', `<body>${req.svgContent}`).replace('<div id="app">', `<div id="app">${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})

server.listen(8081, () => {
    console.log('listen:8081')
})
