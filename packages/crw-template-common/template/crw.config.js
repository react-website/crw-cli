/**
 * @name: crw.config
 * @description: 工程配置文件
 * @author: qq2575896094
 * @time: 2024/1/8
 */

const { resolve } = require('path')

const resolveApp = (relativePath) => resolve(__dirname, 'src', relativePath)

module.exports = () => ({
    alias: {
        '@': resolveApp('.'),
        '@pages': resolveApp('pages'),
        '@components': resolveApp('components'),
        '@fonts': resolveApp('css/fonts'),
        '@framework': resolveApp('framework'),
        '@helper': resolveApp('helper')
    },
    proxy: {
        '/users': {
            target: 'http://0.0.0.0:3003/users',
	        pathRewrite: { '^/users': '' }
        }
    },
})
