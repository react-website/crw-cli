/**
 * @name: getCache
 * @description: webpack cache
 * @author: qq2575896094
 * @time: 2024/1/12
 */
const { createHash } = require('crypto')

const createVersion = () => {
    const hash = createHash('md5')
    hash.update(J)

    return hash.digest('hex')
}

module.exports = (cachePath) => ({
    type: 'filesystem',
    version: '',
    cacheDirectory: cachePath,
    buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],

    },
    store: 'pack',
})
