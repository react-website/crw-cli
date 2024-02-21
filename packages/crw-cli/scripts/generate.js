import fs from 'fs-extra'
import render from '@react-website/crw-generate-template'

export default (compType, compName) => {
    const rootPath = fs.realpathSync(process.cwd())
    render(rootPath, compType, compName)
}
