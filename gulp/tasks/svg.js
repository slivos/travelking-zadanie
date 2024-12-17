'use strict';

const paths = require('./../paths')
// const settings = require('./../settings')
const globs = require("./../globs")

const { src, dest, series } = require('gulp')
const svgmin = require('gulp-svgmin')
const newer = require("gulp-newer")

const svgMin = () => {
  return src(globs.svg)
    .pipe(newer(paths.build.images))
    .pipe(svgmin())
    .pipe(dest(paths.build.images))
}

exports.svgMinTask = series(svgMin)

