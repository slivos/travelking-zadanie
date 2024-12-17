'use strict'

// Variables
const paths = require('./../paths')
const settings = require('./../settings')
const globs = require('./../globs')

// Gulp
const { src, dest, series, parallel } = require('gulp')

// Utilities
const fs = require('fs-extra')
const fg = require('fast-glob')
const plumber = require('gulp-plumber')

// Gulp tools
const data = require('gulp-data')
const { formatHTML } = require('gulp-format-html')
const twigRender = require('gulp-twig')

const initJsonData = async () => {
  const jsonFiles = (await fg([
    `${paths.src.data}**/*.json`,
    `${paths.src.components}**/*.json`,
  ])).filter((file) => {
    const fileSize = fs.statSync(file)['size']
    return fileSize > 0
  })

  let data = {}
  for (const filePath of jsonFiles) {
    const rawData = fs.readFileSync(filePath);
    const readable = JSON.parse(rawData);
    data = { ...data, ...readable }
  }

  fs.writeFileSync(`${paths.srcRoot}data.json`, JSON.stringify(data, null, 2))
}

const getJsonData = () => JSON.parse(fs.readFileSync(`${paths.srcRoot}data.json`))

const twig = async () => {
  const files = await fg([
    globs.twigLayout,
    globs.twigLayoutStylebook
  ])
  return src(files)
    .pipe(plumber())
    .pipe(data(getJsonData()))
    .pipe(twigRender(settings.twig))
    .pipe(formatHTML(settings.html))
    .pipe(dest(paths.buildRoot))
}

exports.htmlTask = parallel(twig)

exports.jsonTask = series(initJsonData)


