const { Command } = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const packageJson = require('./package.json')
const { createApp, generate } = require('./tasks')
const { checkNodeSemver } = require('./utils/checkVersion')

checkNodeSemver()

const program = new Command(packageJson.name)
    .description(`Develop React Website Application by ${packageJson.name}.`)
    // .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .version(packageJson.version)

// create project command
program.command('create <project-name>')
    .description(`Create a new project template by ${packageJson.name}`)
    .action(createApp)

// generate project files
program.command('gen <project-name>')
    .description(`Generate a project file template by ${packageJson.name}`)
    .action(generate)

program.on('--help', () => {
    console.log(
        chalk.green(
            figlet.textSync(packageJson.name, {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 100,
                whitespaceBreak: true,
            }),
        ),
    )
})

program.parse(process.argv)
