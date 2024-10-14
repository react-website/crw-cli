const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getProjectConf } = require('../crw-utils')

const {
    imageInlineSizeLimit = 1000,
} = getProjectConf()

const getStyleLoader = (isProductionEnv, isDevelopmentEnv, appPath, cssOptions, preLoader) => {
    const loaders = []
    if (isDevelopmentEnv) loaders.push({ loader: 'style-loader' })

    if (isProductionEnv) {
        loaders.push({
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../',
            },
        })
    }

    loaders.push(
        { loader: 'css-loader', options: cssOptions },
        { loader: 'postcss-loader' },
    )

    if (preLoader) {
        loaders.push(
            {
                loader: 'resolve-url-loader',
                options: {
                    root: appPath,
                    sourceMap: !isProductionEnv,
                },
            },
            {
                loader: preLoader,
                options: {
                    sourceMap: true,
                },
            },
        )
    }

    return loaders
}

module.exports = (isProductionEnv, isDevelopmentEnv, appPath) => ({
    parser: {
        javascript: {
            dynamicImportMode: 'lazy', // 'eager' | 'weak' | 'lazy' | 'lazy-once'
        },
    },
    rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [{ loader: 'babel-loader' }],
            include: appPath,
            exclude: /node_module/,
        },
        {
            oneOf: [
                {
                    test: /\.css$/,
                    include: appPath,
                    // exclude: /node_module/,
                    use: getStyleLoader(isProductionEnv, isDevelopmentEnv, appPath, {
                        importLoaders: 1,
                        sourceMap: isProductionEnv,
                        modules: {
                            mode: 'icss',
                        },
                    }),
                    sideEffects: true,
                },
                {
                    test: /\.s[a|c]ss$/,
                    include: appPath,
                    // exclude: /node_module/,
                    use: getStyleLoader(isProductionEnv, isDevelopmentEnv, appPath, {
                        importLoaders: 3,
                        sourceMap: isProductionEnv,
                        modules: {
                            mode: 'local',
                            localIdentName: '[path][local]',
                        },
                    }, 'sass-loader'),
                    sideEffects: true,
                },
                {
                    test: /\.less$/,
                    include: appPath,
                    use: getStyleLoader(isProductionEnv, isDevelopmentEnv, appPath, {
                        importLoaders: 3,
                        sourceMap: isProductionEnv,
                        modules: {
                            mode: 'icss',
                        },
                    }, 'less-loader'),
                    sideEffects: true,
                },
                {
                    test: /\.(bmp|gif|jpeg|jpg|png)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: imageInlineSizeLimit,
                        },
                    },
                    generator: {
                        publicPath: '/static/images/',
                        outputPath: './static/images',
                    },
                },
                {
                    test: /\.avif/,
                    type: 'asset',
                    mimetype: 'images/avif',
                    parser: {
                        dataUrlCondition: {
                            maxSize: imageInlineSizeLimit,
                        },
                    },
                },
                {
                    exclude: /\.(js|mjs|jsx|ts|tsx|html|json)$/,
                    type: 'asset/resource',
                },
            ],
        },
    ],
})
