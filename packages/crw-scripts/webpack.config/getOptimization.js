/**
 * @name: getOptimization
 * @description: webpack optimization 优化
 * @author: qq2575896094
 * @time: 2024/1/9
 */
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = (isProductionEnv) => ({
    minimize: isProductionEnv,
    minimizer: [
        new TerserWebpackPlugin({
            parallel: true,
            terserOptions: {
                parse: { ecma: 8 },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                    pure_funcs: ['console.log'],
                },
                mangle: { safari10: true },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
        }),
        new CssMinimizerWebpackPlugin(),
    ],
    splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
            defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
})
