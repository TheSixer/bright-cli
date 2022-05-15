import babel from "gulp-babel";
import del from "del";
import gulp from "gulp";
import uglify from "gulp-uglify";

const { dest, src, task, series } = gulp;

function clean(cb) {
  return del(['dist'], cb);
}

function toJs(cb) {
  return src('src/**/*.js')
    .pipe(uglify()) //压缩
    .pipe(dest("dist")); //输出目录
}

const build = series(clean, toJs);
task('build', build);
export default build;
