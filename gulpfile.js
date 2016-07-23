var clean = require('del'),
    gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    shell = require('gulp-shell');


var dist = {
    root: './dist/',
    views: './dist/assets/views/',
    js: './dist/assets/js/',
    css: './dist/assets/css/',
    images: './dist/assets/images/',
    svg: './dist/assets/svg/',
    fonts: './dist/assets/fonts/'
};

var files = {
    index: [
        './src/index.htm'
    ],
    views: [
        './src/app/**/*.htm'
    ],
    js: [
        './src/app/**/*.js'
    ],
    css: [
        './node_modules/angular-material/angular-material.min.css',
        './node_modules/font-awesome/css/*'
    ],
    libs: [
        './node_modules/html5shiv/dist/html5shiv.min.js',
        './node_modules/respond-minmax/dest/respond.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-material/angular-material.min.js',
        './node_modules/angular-messages/angular-messages.min.js'
    ],
    fonts: [
        './node_modules/font-awesome/fonts/*.eot',
        './node_modules/font-awesome/fonts/*.svg',
        './node_modules/font-awesome/fonts/*.ttf',
        './node_modules/font-awesome/fonts/*.woff'
    ],
    images: [
        './src/assets/images/**/*'
    ],
    svg: [
        './src/assets/svg/**/*'
    ]
};

// Build a locally testable version
gulp.task('build', function() {
    runSequence(
        'clean',
        'minify',
        'sass',
        'copy'
    );
});

// Build an unminified version for debugging
gulp.task('build:debug', function() {
    runSequence(
        'clean',
        'concat',
        'sass',
        'copy'
    );
});

// Clean the dist directory
gulp.task('clean', function() {
    clean.sync([
        'dist/**/*'
    ]);
});

// Build minified JS and sourcemaps
gulp.task('minify', function() {
    gulp.src(files.js)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist.js));

    gulp.src(files.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.js));
});

// Build a debuggable, concatinated only version of the JS
gulp.task('concat', function() {
    gulp.src(files.js)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(dist.js));

    gulp.src(files.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.js));
});

// Compile SASS to CSS
gulp.task('sass', function() {
    gulp.src('./src/sass/app.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(rename(function(path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest(dist.css));
});

// Copy static files for local builds to the dist directory
gulp.task('copy', function() {
    gulp.src(files.index)
        .pipe(gulp.dest(dist.root));

    gulp.src(files.views)
        .pipe(gulp.dest(dist.views));

    gulp.src(files.libs)
        .pipe(gulp.dest(dist.js));

    gulp.src(files.images)
        .pipe(gulp.dest(dist.images));

    gulp.src(files.css)
        .pipe(gulp.dest(dist.css));

    gulp.src(files.fonts)
        .pipe(gulp.dest(dist.fonts));

    gulp.src(files.svg)
        .pipe(gulp.dest(dist.svg));

});

// Launch live server
gulp.task('serve', shell.task([
    'cd dist;live-server --open=index.htm --quiet'
]));

// Watch for changes in the src directory and build the dev version
gulp.task('watch', function() {
    gulp.start('serve');
    gulp.start('build');
    watch('./src/**/*', function() {
        gulp.start('build');
    });
});