var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task("default", function(){
    browserSync.init({server:"src/"}); //Starting browsersync on the  src folder
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]); // execute the sass task
    gulp.watch("src/*.html").on("change", browserSync.reload); //reload the html files
});

// Compilar sass
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") //Loaded the style.scss file
        .pipe(sass().on("error", sass.logError)) //compile
        .pipe(gulp.dest("src/css/")) //save
        .pipe(browserSync.stream()); // reload the css on browser
});