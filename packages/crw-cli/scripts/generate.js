import fs from 'fs-extra'
import render from '@react-website/crw-generate-template'

export default (compType, compName) => {
    const rootPath = fs.realpathSync(process.cwd())
    console.log('haha')
    console.log('generate', compType, compName)
    render()
}
