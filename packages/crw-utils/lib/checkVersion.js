import ora from 'ora'
import axios from 'axios'
import { execSync } from 'child_process'
import semver from 'semver'

/**
 * 获取crw-cli最新版本
 * @returns {Promise<*>}
 */
export const getVersion = async () => {
    let latest = null
    const spinner = ora('正在获取crw-cli的最新版本...').start()
    const res = await axios.get('https://registry.npmjs.org/-/package/@react-website/crw-cli/dist-tags')
    if (res) {
        latest = res.data.latest
    } else {
        latest = execSync('npm view create-react-website1-cli version').toString().trim()
    }
    spinner.succeed()

    return latest
}

/**
 * 版本比较
 * @param latest
 * @param version
 * @returns {boolean}
 */
export const compareVersion = (latest, version) => latest && semver.lt(version, latest)
