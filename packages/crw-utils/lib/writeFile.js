import fs from 'fs-extra'
import { createRequire } from 'node:module'
import os from 'os'
import * as path from 'path'

/**
 * 写文件
 * @param filePath
 * @param data
 */
export const writeJson = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + os.EOL)
}

/**
 * 拷贝模版
 * @param templateNames
 * @param appPath
 */
export const copyTemplate = (templateNames, appPath) => {
    const requireFn = createRequire(import.meta.url)

    templateNames.forEach((templateName) => {
        const templatePath = path.dirname(requireFn.resolve(`${templateName}/package.json`, { paths: [appPath] }))
        fs.copySync(path.join(templatePath, 'template'), appPath)
    })
}

/**
 * 判断文件是否存在
 * @param filePath
 * @returns {*}
 */
export const hasTemplateJson = (filePath) => fs.pathExistsSync(filePath)

/**
 * 合并package.json文件
 * @param packageJsonPath
 * @param templateJsonPath
 */
export const mergePackageJson = (packageJsonPath, templateJsonPath) => {
    const {
        devDependencies = {},
        dependencies = {},
        ...otherPackageJson
    } = fs.readJsonSync(packageJsonPath)
    const {
        devDependencies: tempDevDependencies = {},
        dependencies: tempDependencies = {},
        ...tempOtherPackageJson
    } = fs.readJsonSync(templateJsonPath)

    writeJson(packageJsonPath, {
        ...tempOtherPackageJson,
        ...otherPackageJson,
        devDependencies: {
            ...tempDevDependencies,
            ...devDependencies,
        },
        dependencies: {
            ...tempDependencies,
            ...dependencies,
        },
    })
}
