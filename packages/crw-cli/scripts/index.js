import { Command } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readJson } from '@react-website/crw-utils'

import create from './create.js'
import generate from './generate.js'

/**
 * init 入口方法
 */
const init = () => {
    const name = 'crw-cli'
    const { version } = readJson(resolve(dirname(fileURLToPath(import.meta.url)), '../package.json'))

    const program = new Command(name)
        .alias('crw')
        .version(version)
        .usage(`${chalk.green('<command> [options]')}`)
        .on('--help', () => {
            console.log(chalk.green(
                figlet.textSync(name, {
                    font: 'Ghost',
                    horizontalLayout: 'default',
                    verticalLayout: 'default',
                    width: 100,
                    whitespaceBreak: true,
                }),
            ))
        })

    // create command
    program.command('create')
        .arguments('<project-name>')
        .description(`welcome to create project templates using ${name}.`)
        .action((projectName) => create(projectName, version))

    // gen command
    program.command('gen')
        .arguments('<comp-type> <comp-name>')
        .description(`Generate a project file template by ${name}`)
        .action((compType, compName) => generate(compType, compName))

    program.parse(process.argv)
}

export default init
