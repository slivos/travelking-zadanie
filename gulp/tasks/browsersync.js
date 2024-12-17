'use strict';
const { series } = require('gulp');
const settings = require('./../settings')

const browsersync = require("browser-sync").create()

const browserSyncInit = (done) => {
  browsersync.init(settings.browsersync)
  done()
}

const browsersyncReload = (done) => {
  browsersync.reload();
  done();
}

exports.browsersync = browsersync

exports.browserSyncInit = series(browserSyncInit)
exports.browsersyncReload = browsersyncReload
