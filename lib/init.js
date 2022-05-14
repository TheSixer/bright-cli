// 交互式命令行
const inquirer = require('inquirer')
// 修改控制台字符串的样式
const chalk = require('chalk')
// node 内置文件模块
const fs = require('fs')
const ora = require('ora')

// 读取template下内置的模版
const tplObj = require('./template')

// 下载
const download = require('download-git-repo');

// 自定义交互式命令行的问题及简单的校验
const question = [
  {
    name: 'name',
    type: 'input',
    message: 'Project name (' + name + ')',
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  {
      name: 'description',
      type: 'input',
      message: 'Project description'
  },
]

inquirer
  .prompt(question).then(answers => {
    // answers 就是用户输入的内容，是个对象
    const {
        description
    } = answers;
    const projectName = answers.name;
    // 出现加载图标
    const spinner = ora('Downloading...');
    
    const url = tplObj.template[template]
    // 执行下载方法并传入参数
    download(
      url,
      projectName,
      err => {
        if (err) {
          spinner.fail();
          console.log(chalk.red(`Generation failed. ${err}`))
          return
        }
        // 将用户输入的内容，写入package.json内
        const packageFile = path.join(process.cwd(), projectName + '/package.json');
        const pack = require(packageFile);
        pack.description = description;
        pack.name = projectName;
        fs.writeFileSync(file, `module.exports = ${JSON.stringify(pack, null, '\t')};`, 'utf8');
        // 结束加载图标
        spinner.succeed();
        console.log(chalk.green('\n Generation completed!'))
        console.log('\n To get started')
        console.log(`\n    cd ${projectName} \n`)
      }
    )
  });