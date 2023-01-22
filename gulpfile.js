const { src, dest, series } = require("gulp");
const clean = require("gulp-clean");
const gulpCopy = require("gulp-copy");
const replace = require("gulp-replace");
const minify = require("gulp-minifier");
const terser = require("gulp-terser");

function clearFolder() {
  return src("build", { force: true }).pipe(clean());
}

function copyFiles() {
  return src([
    "src/index.html",
    "src/js/*.js",
    "src/images/*",
    "src/sound/sound-1.mp3",
  ]).pipe(gulpCopy("build", { prefix: 1 }));
}

function replaceTemplate() {
  return src(["build/js/Player.js", "build/js/TileMap.js"])
    .pipe(
      replace("../images/", "http://leandroparice.com.br/goof-troop/images/")
    )
    .pipe(dest("build/js/"));
}

// function minifyAll() {
//   return src("build/**/*")
//     .pipe(
//       minify({
//         minify: true,
//         minifyHTML: {
//           collapseWhitespace: true,
//           conservativeCollapse: true,
//         },
//         minifyJS: {
//           sourceMap: true,
//         },
//         minifyCSS: true,
//         getKeptComment: function (content, filePath) {
//           var m = content.match(/\/\*![\s\S]*?\*\//gim);
//           return (m && m.join("\n") + "\n") || "";
//         },
//       })
//     )
//     .pipe(dest("build"));
// }

// function minifyJs() {
//   return src('build/js/*.js')
//     .pipe(terser({
//       ecma: 6,
//       keep_fnames: false,
//       mangle: {
//         toplevel: true,
//       }
//     }))
//     .pipe(dest('build/js'));
// }

exports.default = series(clearFolder, copyFiles, replaceTemplate);
