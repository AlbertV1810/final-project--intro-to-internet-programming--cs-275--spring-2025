const gulp = require("gulp");
const htmlValidator = require("gulp-html");
const stylelint = require("gulp-stylelint");
const eslint = require("gulp-eslint");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();

gulp.task("validateHTML", () => {
    return gulp.src("src/*.html")
        .pipe(htmlValidator())
        .pipe(gulp.dest("src/validated"));
});

gulp.task("validateCSS", () => {
    return gulp.src("src/*.css")
        .pipe(stylelint({
            reporters: [{ formatter: "string", console: true }]
        }));
});

gulp.task("validateJS", () => {
    return gulp.src("src/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("compressHTML", () => {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("prod"));
});

gulp.task("compressCSS", () => {
    return gulp.src("src/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("prod"));
});

gulp.task("compressJS", () => {
    return gulp.src("src/*.js")
        .pipe(terser())
        .pipe(gulp.dest("prod"));
});

gulp.task("transpileJSForDev", () => {
    return gulp.src("src/*.js")
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(gulp.dest("src/transpiled"));
});

gulp.task("transpileJSForProd", () => {
    return gulp.src("src/*.js")
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(terser()) // Minify for prod
        .pipe(gulp.dest("prod"));
});

gulp.task("serve", () => {
    browserSync.init({
        server: { baseDir: "src/app" }
    });

    gulp.watch("src/*.html", gulp.series("validateHTML")).on("change", browserSync.reload);
    gulp.watch("src/*.css", gulp.series("validateCSS")).on("change", browserSync.reload);
    gulp.watch("src/*.js", gulp.series("validateJS", "transpileJSForDev")).on("change", browserSync.reload);
});

gulp.task("default", gulp.series("validateHTML", "validateCSS", "validateJS", "transpileJSForDev", "serve"));
gulp.task("build", gulp.series("compressHTML", "compressCSS", "compressJS", "transpileJSForProd"));
