const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const spawn = require('cross-spawn')
const { checkCrwVersion, compareVersion } = require('../utils/checkVersion')
const { writeJson, copyTemplate } = require('../utils/writeFile')
const packageJson = require('../package.json')
/**
 * 1. 检测crw版本是否是最新的
 * 2. 选择模版语言
 * 3. 判断是否存在该文件夹
 * 4. 拷贝模版到该文件夹中
 */

const install = async (appPath, template = 'crw-template') => {
    const allDependencies = ['react', 'react-dom', template]
    const command = 'npm'
    const args = ['install', '--save'].concat(allDependencies)
    spawn.sync(command, args, { stdio: 'inherit' })
    // 拷贝模版
    copyTemplate(template, appPath)
}

const createApp = async (name) => {
    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: '请选择模版语言：',
        choices: ['JavaScript', 'TypeScript'],
        default: 'JavaScript',
    })

    // 当前根目录
    const rootPath = path.resolve(name)
    if (fs.pathExistsSync(rootPath)) {
        const { exist } = await inquirer.prompt({
            type: 'confirm',
            name: 'exist',
            message: `当前目录已存在${chalk.red(name)}文件夹, 是否重写?`,
            default: false,
        })
        if (!exist) return
        // 重写 => 删除目录
        fs.removeSync(name)
    }

    fs.mkdirp(name)
    writeJson(path.join(rootPath, 'package.json'), {
        name,
        version: '0.1.0',
        private: true,
    })

    process.chdir(rootPath)

    // 安装软件
    await install(rootPath)
}

/**
 * 入口文件
 * @param name 项目名称
 * @returns {Promise<void>}
 */
module.exports = async (name) => {
    const latest = await checkCrwVersion()

    if (compareVersion(latest, packageJson.version)) {
        console.error(chalk.yellow(`You are running crw-cli ${packageJson.version}.\ncrw-cli latest release ${latest}.\nPlease update crw-cli version.`))
        return
    }

    await createApp(name)
}
