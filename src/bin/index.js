#! /usr/bin/env node

// import packageVersion from './utils/packageVersion';

import chalk from 'chalk';
import { createRequire } from 'module';
import init from '../lib/init.js';
import leven from 'leven';
import program from 'commander';

const require = createRequire(import.meta.url);

async function run() {
  program
  .version(`bright-cli ${require('../../package.json').version}`)
  .option('<command> [options]', '初始化bright项目')

  // if (program.init) {
  //   const spinner = ora('正在从github下载lit-template').start();
  //   download('TheSixer/lit-template#v1.0.0', program.init, function (err) {
  //     if(!err){
  //       spinner.stop();
  //       // 可以输出一些项目成功的信息
  //       console.info(chalk.blueBright('下载成功'));
  //     }else{
  //       spinner.stop();
  //       // 可以输出一些项目失败的信息
  //     }
  //   })
  // }

  program
    .command('init <template> <app-name>')
    .description('generate a project from a remote template (legacy API, requires @heaven-cli)')
    .option('-c, --clone', 'Use git clone when fetching remote template')
    .option('--offline', 'Use cached template')
    .action((template, name) => {
      init(template, name)
    })

  // output help information on unknown commands
  program.on('command:*', ([cmd]) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
    process.exitCode = 1
  })

  // add some useful info on help
  program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`heaven <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

  program.commands.forEach(c => c.on('--help', () => console.log()))

  program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

  function suggestCommands (unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)

    let suggestion

    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd
      }
    })

    if (suggestion) {
      console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
  }
}

run();