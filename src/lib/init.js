
// 交互式命令行

import Utils from './util/utils.js';
import chalk from 'chalk';
import { createRequire } from 'module';
import download from 'download-git-repo';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import tplObj from './template/index.js';

const require = createRequire(import.meta.url);

const init = (template, name) => {
  // 自定义交互式命令行的问题及简单的校验
  let question = [
    {
      name: "name",
      type: "input",
      message: "Project name (" + name + ")",
      // validate (val) {
      //   if (val === '') {
      //     return 'Name is required!'
      //   } else if (tplObj[val]) {
      //     return 'Template has already existed!'
      //   } else {
      //     return true
      //   }
      // }
    },
    {
      name: "description",
      type: "input",
      message: "Project description",
      // validate (val) {
      //   if (val === '') {
      //     return 'Description is required!'
      //   } else {
      //     return true
      //   }
      // }
    },
  ];
  inquirer.prompt(question).then((answers) => {
    // answers 就是用户输入的内容，是个对象
    let { description } = answers;
    let projectName = answers.name || name;
    const url = tplObj.template[template];
    console.log(url);
    // 出现加载图标
    const spinner = ora("Downloading...");
    spinner.start();
    let rootPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(rootPath)) {
      Utils.mkdirs(rootPath);
    } else {
      spinner.fail(`${projectName}已存在`);
    }
    // 执行下载方法并传入参数
    download(url, projectName, (err) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`));
        return;
      }
      const packageFile = path.join(
        process.cwd(),
        projectName + "/package.json"
      );
      const pack = require(packageFile);
      pack.description = description;
      pack.name = projectName;
      fs.writeFileSync(
        pack,
        `module.exports = ${JSON.stringify(pack, null, "\t")};`,
        "utf8"
      );
      // 结束加载图标
      spinner.succeed();
      console.log(chalk.green("\n Generation completed!"));
      console.log("\n To get started");
      console.log(`\n    cd ${projectName} \n`);
    });

  });
};

export default init;
