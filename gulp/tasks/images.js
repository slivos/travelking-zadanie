'use strict'

const { src, dest, parallel } = require("gulp")
const { favIconFiles, images } = require("../globs")
const { build } = require("../paths")


const copyImages = () => {
  return src(images)
    .pipe(dest(build.images))
}

const copyfavIconFiles = () => {
  return src(favIconFiles)
    .pipe(dest(build.favicon))
}

exports.processImages = parallel(copyImages, copyfavIconFiles)
