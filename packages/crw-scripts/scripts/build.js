const webpack = require('webpack')
const getWebpackConfig = require('../webpack.config')

const { webpackBaseConf } = getWebpackConfig('production')

webpack(webpackBaseConf).run((err, stats) => {
    if (err) console.error(err, stats.errors)
})
