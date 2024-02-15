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

let db = {}
const filePaths = walk(MOCK_DIR)

filePaths.forEach((filePath) => {
    const prefix = filePath.slice(0, -3).split('/mock/test/')[1]

    let curObj = {}
    Object.entries(require(filePath)).forEach(([key, val]) => {
        curObj = {
            ...curObj,
            [`${prefix}_${key}`]: val,
        }
    })
    db = {
        ...db,
        ...curObj,
    }
})

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
    // 修改请求方式
    req.method = 'GET'

    // 修改请求路径 ps: /users/login => users_login
    let url = req.url.slice(1)
    url = url.split('/').join('_')
    req.url = `/${url}`

    next()
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
