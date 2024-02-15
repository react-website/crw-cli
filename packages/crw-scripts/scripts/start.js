/**
 * @name: start
 * @description: crw-script的start脚本
 * @author: qq2575896094
 * @time: 2023/10/27
 */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const getWebpackConfig = require('../webpack.config')
const { createCompiler } = require('../crw-utils')

const { webpackBaseConf, devServerConf } = getWebpackConfig('development')

new WebpackDevServer(
    devServerConf,
    createCompiler(
        webpack,
        webpackBaseConf,
    ),
).start()
