const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const Webpackbar = require('webpackbar')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

// 获取html-webpack.config-plugin的options
const getHtmlWebpackPluginOptions = (appHtml) => {
    const { TITLE } = process.env
    return {
        inject: true,
        template: appHtml,
        title: TITLE,
        favicon: 'src/images/favicon.ico',
        cache: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    }
}

module.exports = (isProductionEnv, appPath, appHtml, swSrc) => [
    new HtmlWebpackPlugin(getHtmlWebpackPluginOptions(appHtml)),
    new EslintWebpackPlugin({
        context: appPath,
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules'],
        eslintPath: require.resolve('eslint'),
        files: ['./src'],
        fix: false,
    }),
    isProductionEnv && new MiniCssExtractPlugin({
        filename: 'static/css/[name]-[contenthash:8].css',
        chunkFilename: 'static/css/[name]-[contenthash:8].chunk.css',
    }),
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
    }),
    new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files, entries) => {
            const manifestFiles = files.reduce((manifest, file) => {
                manifest[file.name] = file.path
                return manifest
            }, seed)

            const entrypoints = entries.main.filter((fileName) => !fileName.endsWith('.map'))

            return { files: manifestFiles, entrypoints }
        },
    }),
    // new WorkboxWebpackPlugin.GenerateSW({
    //     swSrc,
    //     dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    //     exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/, /\.md/],
    //     maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    // }),
    // webpack compiled bar
    new Webpackbar(),

    new StylelintWebpackPlugin({
        files: ['src/**/*.scss'],
        extensions: 'scss',
        failOnError: false,
        threads: true,
        fix: true,
    }),

    new CopyWebpackPlugin({
        patterns: [
            {
                from: 'docs',
                to: 'docs',
            },
        ],
    }),
]
