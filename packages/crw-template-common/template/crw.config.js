/**
 * @name: crw.config
 * @description: 工程配置文件
 * @author: qq2575896094
 * @time: 2024/1/8
 */

module.exports = () => ({
    // 图片转URL的大小限制
    imageInlineSizeLimit: 1000,
    publicPath: '/', // / or ../
    port: 8890,
    proxy: {
        '/users': {
            target: 'http://0.0.0.0:3003',
            changeOrigin: true,
        },
    },
})
