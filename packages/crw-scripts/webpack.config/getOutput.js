const path = require('path')
const { getProjectConf } = require('../crw-utils')

const {
    publicPath = '/',
} = getProjectConf()

// webpack.config output
module.exports = (isProductionEnv, isDevelopmentEnv, distPath, appPath) => {
    const filename = isProductionEnv
        ? 'static/scripts/[name]-[contenthash:8].js'
        : isDevelopmentEnv && 'static/scripts/[name].bundle.js'
    const chunkFilename = isProductionEnv
        ? 'static/scripts/[name]-[contenthash:8].chunk.js'
        : isDevelopmentEnv && 'static/scripts/[name].chunk.js'

    return {
        path: distPath,
        clean: true,
        pathinfo: isDevelopmentEnv,
        publicPath,
        filename,
        chunkFilename,
        // assetModuleFileName: '',
        devtoolModuleFilenameTemplate: isProductionEnv
            ? (info) => path.relative(appPath, info.absoluteResourcePath).replace(/\\/g, '/')
            : isDevelopmentEnv && ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    }
}
