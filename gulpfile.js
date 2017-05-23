var postcss = require("gulp-postcss"),
  gulp     = require("gulp"),
  rename   = require("gulp-rename"),
  concat   = require("gulp-concat"),
  atImport = require("postcss-import"),
  cssnano  = require("cssnano"),
  cssnext  = require("postcss-cssnext"),
  postcssEach  = require("postcss-each"),
  postcssFor  = require("postcss-for"),
  atVariables = require('postcss-at-rules-variables'),
  //postcssStripUnits = require("postcss-strip-units"),
  calc = require("postcss-calc"),
  rem = require("pixrem"),
  postcssMath = require("postcss-math"),
  lost     = require("lost"),
  livereload = require("gulp-livereload")
;


var admin_js_assets = [

  // CodeMirror
  './bower_components/codemirror/lib/codemirror.js',
  './bower_components/codemirror/mode/css/css.js',
  './bower_components/codemirror/addon/hint/show-hint.js',
  './bower_components/codemirror/addon/edit/closebrackets.js',

  //
  './bower_components/iCheck/icheck.js',
];


//gulp.task('admin:js', function() {
  //return gulp.src(admin_js_assets)
    //.pipe(concat('admin.js'))
    //.pipe(gulp.dest('./library/public/js'));
//});


//gulp.task("admin:css", function() {
  //var preprocessors = [
    //atImport(),
    //cssnext({compress: true}),
    //lost(),
    //cssnano(),
  //];

  //return gulp.src("./library/css/main.css")
    //.pipe(postcss(preprocessors))
    //.pipe(rename("style.css"))
    //.pipe(gulp.dest("./library/public/css"));

//});

gulp.task("css", function() {
  var preprocessors = [
    atImport(),
    atVariables(),
    postcssEach(),
    postcssFor(),
    cssnext({ browsers: "last 3 versions" }),
    //postcssStripUnits(),
    postcssMath(),

    // those plugins already in nextcss, we're using them here
    // just to process the left of processing postcssMath plugin
    calc,
    rem,

    //lost(),
    //cssnano(),
  ];

  return gulp.src("./assets/css/main.css")
    .pipe(postcss(preprocessors))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("./css"))
});


gulp.task("default", function() {
  gulp.watch("assets/css/**/*.css", ["css"]);
});
