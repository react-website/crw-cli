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

module.exports = {
    writeJson,
    copyTemplate,
}
