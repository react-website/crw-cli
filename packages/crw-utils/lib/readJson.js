import fs from 'fs-extra'

export default (filePath) => fs.readJsonSync(filePath)
