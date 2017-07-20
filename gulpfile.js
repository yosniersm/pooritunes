var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    gulpImport = require("gulp-html-import"),
    browserSync = require('browser-sync').create();


gulp.task("default",["html","sass"], function(){
    browserSync.init({server:"dist/", browser:"chrome"}); //Starting browsersync on the  src folder
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]); // execute the sass task
    gulp.watch("src/*.html").on("change", browserSync.reload); //reload the html files
    gulp.watch("src/*.html", function(){
        browserSync.reload;
        notify().write("Browser reloaded");
    } )

    gulp.watch(["src/*.html","src/**/*.html"],["html"]);


});

// Compilar sass
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") //Loaded the style.scss file
        .pipe(sass().on("error", function(error){
            return notify().write(error) // Show notification if there is an error
        })) //compile
        .pipe(gulp.dest("dist/")) //save
        .pipe(browserSync.stream())// reload the css on browser
        .pipe(notify("SASS compiled")); //Show notifactions on screen
});

//copy and import html
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("HTML imported"))
})