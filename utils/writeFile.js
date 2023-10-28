const fs = require('fs-extra')
const os = require('os')
const path = require('path')

const writeJson = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + os.EOL)
}

/**
 * 拷贝模版
 * @param templateName
 * @param appPath
 */
const copyTemplate = (templateName, appPath) => {
    const templatePath = path.dirname(require.resolve(`${templateName}/package.json`, { paths: [appPath] }))
    fs.copySync(path.join(templatePath, 'template'), appPath)
}

/**
 * 判断文件是否存在
 * @param filePath
 * @returns {*}
 */
const hasTemplateJson = (filePath) => fs.pathExistsSync(filePath)

const mergePackageJson = (packageJsonPath, templateJsonPath) => {
    const packageJson = fs.readJsonSync(packageJsonPath)
    const templateJson = fs.readJsonSync(templateJsonPath)

    writeJson(packageJsonPath, { ...templateJson, ...packageJson })
}

module.exports = {
    writeJson,
    copyTemplate,
    hasTemplateJson,
    mergePackageJson,
}
