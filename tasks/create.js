const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const spawn = require('cross-spawn')
const ora = require('ora')
const { checkCrwVersion, compareVersion } = require('../utils/checkVersion')
const {
    writeJson,
    copyTemplate,
    hasTemplateJson,
    mergePackageJson,
} = require('../utils/writeFile')
const packageJson = require('../package.json')
/**
 * 1. 检测crw版本是否是最新的
 * 2. 选择模版语言
 * 3. 判断是否存在该文件夹
 * 4. 拷贝模版到该文件夹中
 */

const install = async ({
    appPath,
    packageJsonPath,
    template = 'crw-template',
}) => {
    const allDependencies = [template, 'crw-scripts']
    const command = 'npm'
    const args = ['install']

    let spinner = ora('正在拉取项目模版...').start()
    console.log()
    let res = spawn.sync(command, args.concat('--save', allDependencies))
    if (res.error)spinner.fail('拉取项目模版失败.')
    spinner.succeed()

    // 拷贝模版
    copyTemplate(template, appPath)

    // 判断模版是否存在template.json文件
    const templateJsonPath = path.join(appPath, 'template.json')
    if (hasTemplateJson(templateJsonPath)) {
        mergePackageJson(packageJsonPath, templateJsonPath)
        fs.removeSync(templateJsonPath)
    }
    // 删除模版
    spawn.sync(command, ['uninstall', template])

    // 下载依赖
    spinner = ora('正在下载项目依赖, 等待中...').start()
    res = spawn.sync(command, args, { stdio: 'inherit' })
    if (res.error)spinner.fail('下载项目依赖失败.')
    spinner.succeed()
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
    const appPath = path.resolve(name)
    if (fs.pathExistsSync(appPath)) {
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

    fs.mkdirpSync(name)

    const packageJsonPath = path.join(appPath, 'package.json')
    writeJson(packageJsonPath, { name, version: '0.1.0', private: true })

    process.chdir(appPath)

    // 安装软件
    await install({
        appPath,
        packageJsonPath,
    })
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
