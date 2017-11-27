var gulp = require('gulp');
var sass = require('gulp-sass');



gulp.task('csxSass',function(){
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'));
});

// 监听任务
// gulp.task('jt',function(){
//     gulp.watch('./src/sass/*.scss',['csxSass'])
// })

// // home监听任务
// gulp.task('home',function(){
//     gulp.src('./src/sass/home.scss')
//         .pipe(sass().on('error',sass.logError))
//         .pipe(gulp.dest('./src/css/'));
// });

// // 监听任务
// gulp.task('jthome',function(){
//     gulp.watch('./src/sass/home.scss',['home'])
// })

// 超级监听
var browserSync = require('browser-sync');
// 自动刷新服务器
// php服务器（12306）：能解析php文件
// browserSync服务器（666）：能自动刷新
gulp.task('se',function(){
    // 创建服务器
    browserSync({
        // 指定服务器目录
        // server:'./src',

        // 代理
        proxy:'http://localhost/csx',

        // 指定服务器端口（默认：3000）
        port:666,

        // 监听文件修改
        // 当文件有修改时，自动刷新页面
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });

    // 监听sass的修改
    gulp.watch('./src/sass/*.scss',['csxSass'])

});