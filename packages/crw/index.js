import { Command } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readJson } from 'crw-utils'
import { create, generate } from './scripts/index.js'

/**
 * init 入口方法
 */
const init = () => {
    const { name, version } = readJson(resolve(dirname(fileURLToPath(import.meta.url)), './package.json'))

    const program = new Command('crw-cli')
        .alias(name)
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
        .action(() => create(name, version))

    // gen command
    program.command('gen <project-name>')
        .description(`Generate a project file template by ${name}`)
        .action(generate)

    program.parse(process.argv)
}

export default init
