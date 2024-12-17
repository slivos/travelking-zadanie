'use strict';

const globs = require("./gulp/globs")
const { series, parallel, watch } = require('gulp')

// Tasks
const { scssTask } = require("./gulp/tasks/styles")
const { htmlTask, jsonTask } = require("./gulp/tasks/html")
const { svgMinTask } = require("./gulp/tasks/svg")
const { processImages } = require("./gulp/tasks/images");
const { processFonts } = require("./gulp/tasks/fonts");
const { copyTheme } = require("./gulp/tasks/copy")

const { browserSyncInit } = require('./gulp/tasks/browsersync');

const watchFiles = () => {
  watch(globs.scss, scssTask)
  watch(globs.twig, parallel(htmlTask, scssTask))
  watch(globs.json, series(jsonTask, htmlTask))
  watch(globs.svg, series(svgMinTask))
  watch(globs.fonts, series(processFonts))
  watch([...globs.images, ...globs.favIconFiles], series(processImages))
}
const watchBunFiles = () => {
  watch(globs.svg, series(svgMinTask))
  watch(globs.fonts, series(processFonts))
  watch([...globs.images, ...globs.favIconFiles], series(processImages))
}

const build = series(
  parallel(processImages, svgMinTask, processFonts),
  parallel(series(jsonTask, htmlTask), scssTask),
)

const buildBun = series(
  parallel(processImages, svgMinTask, processFonts),
)

exports.default = series(browserSyncInit, watchFiles)
exports.build = build

exports.buildBun = buildBun
exports.watchBun = watchBunFiles

exports.copy = copyTheme

exports.svg = svgMinTask

exports.html = htmlTask
exports.css = scssTask
exports.json = jsonTask
