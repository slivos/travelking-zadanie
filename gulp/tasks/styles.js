'use strict';

const paths = require('./../paths')
const settings = require('./../settings')

const {
  src,
  dest,
  parallel
} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const sassGlob = require('gulp-sass-glob')
const postcss = require('gulp-postcss')

// ------------ postcss plugins
const emMediaQuery = require('postcss-em-media-query')
const pxtorem = require('postcss-pxtorem')
const flexbugsFixes = require('postcss-flexbugs-fixes')
const purgecss = require('@fullhuman/postcss-purgecss')
const viewportHeightCorrection = require('postcss-viewport-height-correction')
const postcss100vhfix = require('postcss-100vh-fix')

const scss = () => {
  return src(`${paths.src.scss}style.scss`)
    .pipe(sassGlob(settings.sass))
    .pipe(sourcemaps.init())
    .pipe(sass.sync(settings.sass)).on('error', sass.logError)
    .pipe(
      postcss([
        flexbugsFixes(),
        viewportHeightCorrection(),
        postcss100vhfix(),
        emMediaQuery(settings.emMediaQuery),
        purgecss(settings.purgeCss),
        pxtorem(settings.pxtorem)
      ])
    )
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`${paths.srcRoot}css/`))
}

exports.scssTask = parallel(scss)
