/**
 * @name: getProjectConf
 * @description: 获取工程的配置文件
 * @author: qq2575896094
 * @time: 2023/10/27
 */
const fs = require('fs-extra')
const dotenv = require('dotenv')
const { resolve } = require('path')

const rootPath = fs.realpathSync(process.cwd())

// 获取.env配置文件
dotenv.config({ path: resolve(rootPath, '.env') })

const extensions = [
    'js',
    'jsx',
    'ts',
    'tsx',
]

const resolveApp = (relativePath) => resolve(rootPath, relativePath)

// 获取模块路径
const resolveModule = (resolveFn, filePath) => {
    const extension = extensions.find((ext) => fs.existsSync(`${filePath}.${ext}`))

    if (extension) return resolveFn(`${filePath}.${extension}`)
    return resolveFn(`${filePath}.js`)
}

module.exports = () => {
    let projectConf = {
        port: 8090,
        proxy: {},
        alias: {},
    }
    const configPath = resolve(rootPath, 'crw.config.js')
    if (fs.pathExistsSync(configPath)) {
        const conf = require(configPath)()
        projectConf = {
            ...projectConf,
            ...conf,
        }
    }

    return {
        entryPath: resolveModule(resolveApp, 'src/index'),
        appHtml: resolveApp('src/index.html'),
        rootPath: resolveApp('.'),
        appPath: resolveApp('src'),
        distPath: resolveApp('dist'),
        mockPath: resolveApp('mock'),
        webpackCache: resolveApp('node_modules/.cache'),
        swSrc: resolveModule(resolveApp, 'src/service-worker'),
        ...projectConf,
    }
}
