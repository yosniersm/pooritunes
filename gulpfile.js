var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync').create();


gulp.task("default", function(){
    browserSync.init({server:"src/"}); //Starting browsersync on the  src folder
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]); // execute the sass task
    gulp.watch("src/*.html").on("change", browserSync.reload); //reload the html files
    gulp.watch("src/*.html", function(){
        browserSync.reload;
        notify().write("Browser reloaded");
    } )


});

// Compilar sass
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") //Loaded the style.scss file
        .pipe(sass().on("error", function(error){
            return notify().write(error) // Show notification if there is an error
        })) //compile
        .pipe(gulp.dest("src/css/")) //save
        .pipe(browserSync.stream())// reload the css on browser
        .pipe(notify("SASS compilado")); //Show notifactions on screen
});