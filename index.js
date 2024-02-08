import chalk from 'chalk'
import init from 'crw'

/**
 * 检测Nodejs版本
 */
const curNodeVersion = process.versions.node
const semverVersion = curNodeVersion.split('.')

if (semverVersion[0] < 14) {
    console.error(
        `You are running Node${chalk.green(curNodeVersion)}.\n`
            + `Create React Web requires Node 14 or higher.\n${
                chalk.red('Please update Node version.')}\n`,
    )
    process.exit(1)
}

init()
