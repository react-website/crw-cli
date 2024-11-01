import chalk from 'chalk'
import inquirer from 'inquirer'
import * as path from 'path'
import fs from 'fs-extra'
import { spawn } from 'cross-spawn'
import ora from 'ora'
import {
    compareVersion,
    getVersion,
    writeJson,
    copyTemplate,
    hasTemplateJson,
    mergePackageJson,
} from '@react-website/crw-utils'

const install = async ({
    appPath,
    packageJsonPath,
    template = [],
}) => {
    const allDependencies = [...template, '@react-website/crw-scripts']
    const command = 'npm'
    const args = ['install']

    let spinner = ora('正在拉取项目模版, 创建项目开发环境...').start()
    console.log()
    let res = await spawn.sync(command, args.concat('--save-dev', allDependencies))
    if (res.error) spinner.fail('拉取项目模版, 创建项目开发环境失败.')
    spinner.succeed()

    // 拷贝模版
    await copyTemplate(template, appPath)
    // 判断模版是否存在template.json文件
    const templateJsonPath = path.join(appPath, 'template.json')
    if (hasTemplateJson(templateJsonPath)) {
        mergePackageJson(packageJsonPath, templateJsonPath)
        fs.removeSync(templateJsonPath)
    }

    // 下载依赖
    spinner = ora('正在下载项目依赖...').start()
    console.log()
    res = await spawn.sync(command, args)
    if (res.error) spinner.fail('下载项目依赖失败.')
    spinner.succeed()

    // 重命名gitignore文件
    fs.moveSync(`${appPath}/gitignore`, `${appPath}/.gitignore`)

    // 删除模版
    await spawn.sync(command, ['uninstall', ...template])
}

const createApp = async (name) => {
    const { language } = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: '请选择模版语言：',
        choices: ['JavaScript', 'TypeScript'],
        default: 'JavaScript',
    })

    const template = language === 'TypeScript'
        ? ['@react-website/crw-template-common', '@react-website/crw-template-typescript']
        : ['@react-website/crw-template-common', '@react-website/crw-template']

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
        template,
    })
}

/**
 * 入口文件
 * @param projectName 项目名称
 * @param version
 * @returns {Promise<void>}
 */
export default async (projectName, version) => {
    const latest = await getVersion()

    if (compareVersion(latest, version)) {
        console.warn(`You are running crw-cli ${chalk.yellow(version)}.`)
        console.warn(`crw-cli latest release ${chalk.yellow(latest)}.`)
        console.warn(chalk.yellow('Please update crw-cli version.'))
        return
    }

    await createApp(projectName)
}
