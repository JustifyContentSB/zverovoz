const exec = require('gulp-exec');

module.exports = (gulp, plugins, config) => {
    const {
        paths: {
            src: {
                html: {
                    index: src,
                }
            },
        },
    } = config;

    return done => {
        return gulp.src(src)
            .pipe(exec('npm run husky'))
            .pipe(exec.reporter())
            .on('end', done);
    };
};
