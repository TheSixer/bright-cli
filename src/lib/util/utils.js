import fs from 'fs';
import path from 'path';

/**
 * 创建深层目录
 * @param dirpath
 * @param mode
 */
const mkdirs = function (dirpath, mode) {
  mode = mode || '777';
  if (!fs.existsSync(dirpath)) {
    //尝试创建父目录，然后再创建当前目录
    mkdirs(path.dirname(dirpath), mode);
    fs.mkdirSync(dirpath, mode);
  }
};

/**
 * 删除深层目录
 * @param dirpath
 */
const rmdirs = function (dirpath) {
  try {
    fs.readdirSync(dirpath).forEach(function (filepath) {
      var state = fs.statSync(path.join(dirpath, filepath));
      if (state.isDirectory()) {
        rmdirs(path.join(dirpath, filepath));
      } else {
        fs.unlinkSync(path.join(dirpath, filepath));
      }
    });
    fs.rmdirSync(dirpath);
  } catch (e) {
    console.log(e);
  }
};

export default {
  mkdirs,
  rmdirs,
}