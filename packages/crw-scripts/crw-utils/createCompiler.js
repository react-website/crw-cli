/**
 * @name: createCompiler
 * @description: 获取webpack compiler
 * @author: qq2575896094
 * @time: 2023/10/27
 */
const chalk = require('chalk')

module.exports = (webpack, webpackConf) => {
    let compiler
    try {
        compiler = webpack(webpackConf)
    } catch (e) {
        console.error(chalk.red('Webpack failed to compile'))
        process.exit(1)
    }
    return compiler
}
