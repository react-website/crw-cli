/**
 * @name: getDevServer
 * @description: webpack-dev-server proxy
 * @author: qq2575896094
 * @time: 2023/10/27
 */
const ip = require('ip')

module.exports = (distPath, serverConf) => {
    const { port, proxy = {} } = serverConf
    return {
        host: ip.address(),
        port,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
        open: true,
        hot: true,
        static: {
            directory: distPath,
        },
        historyApiFallback: true,
        compress: true,
        proxy,
    }
}
