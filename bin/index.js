#! /usr/bin/env node

const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
// import packageVersion from './utils/packageVersion';

async function run() {
  // program
  // .version('1.0.0')
  // .option('-i, init [name]', '初始化lit项目')
  // .parse(process.argv);

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
    .action((template, name) => {
      init(template, name)
    })

  // 解析命令行参数
  program.parse(process.argv)
}

run();