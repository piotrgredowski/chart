var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	runSequence = require('run-sequence'),
	ts = require('gulp-typescript'),
	tsProject = ts.createProject('tsconfig.json'),
	del = require('del'),
	useref = require('gulp-useref'),
	cssnano = require('gulp-cssnano'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify');


gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
		browser: ['firefox']
	});
});

gulp.task('useref', () => {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
})

gulp.task('clean:dist', () => {
	return del.sync('dist');
});

gulp.task('sass', () => {
	return gulp.src('src/scss/**/*.+(sass|scss)')
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('ts', () => {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('src/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('movehtml', () => {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('build', () => {
	runSequence('clean:dist',
		['sass', 'useref'])
})

gulp.task('watch', ['browserSync', 'sass', 'ts', 'movehtml'], () => {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/ts/*.ts', ['ts']);
	gulp.watch('src/**/*.html', ['movehtml']);
});

gulp.task('default', () => {
	runSequence('clean:dist', ['useref', 'sass', 'ts', 'movehtml', 'watch']);
});
