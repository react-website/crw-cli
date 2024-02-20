import path from 'path'
import fs from 'fs-extra'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ejs = require('ejs')

const getSource = (fileType) => path.resolve(`./template/index.${fileType}.ejs`)

const getTarget = (baseDir, dir, fileType) => path.resolve(baseDir, dir, `index.${fileType}`)

const charToggle = (c, charCode) => {
    if (charCode >= 97 && charCode <= 122) return [c, String.fromCharCode(charCode - 32), false]
    if (charCode >= 65 && charCode <= 90) return [String.fromCharCode(charCode + 32), c, true]
    return ['', '']
}

/**
 *
 * @param str appMenu, AppMenu
 * @param suffix
 * @returns {[string,{}]}
 */
const getData = (str, suffix) => {
    if (!/^[A-Za-z]+$/g.test(str)) throw new Error('组件名必须是大写和小写字母, 建议是大驼峰或小驼峰格式!')

    let dir = ''
    let funName = ''

    for (let i = 0; i < str.length; i++) {
        const charCode = str[i].charCodeAt(0)
        const [l, u, isUpper] = charToggle(str[i], charCode)

        if (i === 0) {
            dir += l
            funName += u
        } else if (isUpper) {
            dir += `-${l}`
        } else {
            dir += l
        }

        i++
    }

    return [
        dir,
        {
            funName: funName + str.slice(1),
            styleName: `${dir}-${suffix}`,
        },
    ]
}

const renderFile = async (tmpPath, data = {}) => await ejs.renderFile(tmpPath, data)

const renderJsx = async (data) => await renderFile(getSource('jsx'), data)

const renderScss = async (data) => await renderFile(getSource('scss'), data)

export default async (baseDir, suffix, name) => {
    const [dir, data] = getData(name, suffix)

    const jsx = await renderJsx(data)
    const scss = await renderScss(data)

    const jsxTarget = getTarget(baseDir, dir, 'jsx')
    const scssTarget = getTarget(baseDir, `${dir}/scss`, 'scss')
    fs.outputFileSync(jsxTarget, data)
    fs.outputFileSync(scssTarget, data)
}
