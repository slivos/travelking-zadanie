'use strict'

// Gulp
const { src, dest, series } = require('gulp')
const { build } = require("../paths")

const globs = require('./../globs')

const copyFonts = () => {
  return src(globs.fonts)
    .pipe(dest(build.fonts))
}

exports.processFonts = series(copyFonts)
