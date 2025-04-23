const { getProjectConf } = require('../crw-utils')
/**
 * @name: getResolve
 * @description: 获取webpack扩展名及别名
 * @author: qq2575896094
 * @time: 2024/1/8
 */

const { appPath } = getProjectConf()

module.exports = ({ alias = {} }) => ({
    extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
    ],
    alias: {
        ...alias,
    },
})
