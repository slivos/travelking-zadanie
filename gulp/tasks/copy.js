'use strict'

const { src, dest, series } = require("gulp")
const del = require('del')
const rename = require('gulp-rename')

// Utilities
const plumber = require('gulp-plumber')

const { build, buildRoot } = require("../paths")
const paths = require('./../paths')
const fg = require('fast-glob')


const themePath = "../public/"

const cleanImages = () => {
  return del(`${themePath}images`, { force: true })
}

const copyImages = () => {
  return src(`${build.images}**/*`)
    .pipe(plumber())
    .pipe(dest(`${themePath}images/`))
}

const copyWpCss = () => {
  return src(`${paths.src.scss}wordpress-header.css`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(rename("style.css"))
    .pipe(dest(themePath))
}

const copyAssets = async () => {
  const files = await fg(`${buildRoot}*.{css,css.map,js,js.map,svg}`)

  return src(files, { allowEmpty: true })
    .pipe(plumber())
    .pipe(dest(themePath))
}

const cleanAssets = async () => {
  const files = await fg(`${themePath}*.{css,css.map,js,js.map,svg}`)
  return del(files, { force: true })
}

const clean = series(cleanAssets, cleanImages)
const copyAll = series(copyAssets, copyWpCss, copyImages)

exports.copyTheme = series(
  clean,
  copyAll
)
