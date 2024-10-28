const path = require('path')
const fs = require('fs')
const jsonServer = require('json-server')

const { getProjectConf } = require('../crw-utils')

const { mockPath } = getProjectConf()

const MOCK_DIR = path.resolve(mockPath, 'test')

// 获取目录下的所有的方法
const walk = (dir) => {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
        const filePath = path.resolve(dir, file)
        const stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath))
        } else if (path.extname(filePath) === '.js') {
            results.push(filePath)
        }
    })

    return results
}

const db = {}

const filePaths = walk(MOCK_DIR)

filePaths.forEach((filePath) => {
    const prefix = filePath.slice(0, -3).split('/mock/test')[1]

    Object.entries(require(filePath)).forEach(([key, val]) => {
        const u = key.startsWith('?') ? `${prefix}/${key.slice(1)}` : `${prefix}/${key}`
        db[u] = val
    })
})

const server = jsonServer.create()
const router = jsonServer.router({})
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    // 修改请求方式
    req.method = 'POST'

    next()
})

Object.entries(db).forEach(([key, val]) => {
    server.post(key, async (req, res) => {
        const result = typeof val === 'function' ? await val(req.body, req.query) : val

        res.jsonp(result)
    })
})

server.use(router)
server.use(jsonServer.rewriter(require(path.resolve(mockPath, 'rewriterJSON'))))

const host = '0.0.0.0'
const port = 3003

server.listen(
    port,
    host,
    () => {
        console.log(`Mock Server is running in http://${host}:${port}`)
    },
)
