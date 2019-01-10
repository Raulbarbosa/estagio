
const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const connect = require('gulp-connect');

const target = "dist/blackjack"

function imagens() {
    return src('src/imagens/**').pipe(dest(target + "/imagens"));
}

function clean() {
    return del(['dist']);
}

function css() {
    return src(
        'src/css/**'
    ).pipe(dest(target + "/css"));
}

function cssLib() {
    return src(
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ).pipe(dest(target + '/css'));
}

function js() {
    return src([
        'src/js/**',
    ]).pipe(dest(target + "/js"));
}

function jsLib() {
    return src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js'
    ]).pipe(dest(target + '/js'))
}

function templates() {
    return src('src/templates/**').pipe(dest(target + "/templates"));
}

function indexHtml() {
    return src('src/index.html').pipe(dest(target));
}

function server() {
    return connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
 }

function reload(cb) {
    watch('src/js/**', js);
    watch('src/css/**', css);
    cb();
}

const build = series(
    clean, 
    parallel(
        imagens, 
        css,
        cssLib, 
        js,
        jsLib,
        templates, 
        indexHtml
    )
);

const start = series(
    build, 
    parallel(
        server,
        reload
    )
);

exports.default = build;
exports.start = start;
