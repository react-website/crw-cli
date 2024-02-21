import path from 'path'
import fs from 'fs-extra'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ejs = require('ejs')

const dirMap = {
    comp: 'components',
    page: 'pages',
}

const getSource = (fileType) => path.resolve(`./template/index.${fileType}.ejs`)

const getTarget = (baseDir, dir, fileType) => path.resolve(baseDir, dir, `index.${fileType}`)

const charToggle = (c, charCode) => {
    if (charCode >= 97 && charCode <= 122) return [c, String.fromCharCode(charCode - 32), false]
    if (charCode >= 65 && charCode <= 90) return [String.fromCharCode(charCode + 32), c, true]
    return ['', '']
}

/**
 *
 * @param compName appMenu, AppMenu
 * @param compType
 * @returns {[string,{}]}
 */
const getData = (compName, compType) => {
    if (!/^[A-Za-z]+$/g.test(compName)) throw new Error('组件名必须是大写和小写字母, 建议是大驼峰或小驼峰格式!')

    let dir = ''
    let funName = ''

    compName.split('').forEach((c, i) => {
        const charCode = c.charCodeAt(0)
        const [l, u, isUpper] = charToggle(c, charCode)

        if (i === 0) {
            dir += l
            funName += u
        } else {
            funName += c

            const s = isUpper ? `-${l}` : l
            dir += s
        }
    })

    return [
        `${compType}/${dir}`,
        {
            funName,
            styleName: `${dir}-${compType}`,
        },
    ]
}

const renderFile = async (tmpPath, data = {}) => await ejs.renderFile(tmpPath, data)

const renderJsx = async (data) => await renderFile(getSource('jsx'), data)

const renderScss = async (data) => await renderFile(getSource('scss'), data)

export default async (baseDir, compType, compName) => {
    if (!fs.pathExistsSync(path.resolve(baseDir, 'src')) || !fs.pathExistsSync(path.resolve(baseDir, 'package.json'))) {
        throw new Error('请在项目根目录下执行此命令!')
    }

    const basePath = path.resolve(baseDir, 'src', dirMap[compType])

    const [dir, data] = getData(compName, compType)

    const jsx = await renderJsx(data)
    const scss = await renderScss(data)

    const jsxTarget = getTarget(basePath, dir, 'jsx')
    const scssTarget = getTarget(basePath, `${dir}/scss`, 'scss')

    fs.outputFileSync(jsxTarget, jsx)
    fs.outputFileSync(scssTarget, scss)
}
