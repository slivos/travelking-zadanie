'use strict';

// Roots
const srcRoot = "./src/"
const buildRoot = "./dist/"
exports.stylebookRoot = "./stylebook"
exports.nodeModulesRoot = "./node_modules/"

// Paths
exports.src = {
  images: `${srcRoot}images/`,
  scss: `${srcRoot}scss/`,
  js: `${srcRoot}js/`,
  components: `${srcRoot}components/`,
  layouts: `${srcRoot}layouts/`,
  data: `${srcRoot}data/`,
  fonts: `${srcRoot}fonts/`,
}

exports.build = {
  images: `${buildRoot}images/`,
  styles: buildRoot,
  scripts: buildRoot,
  favicon: `${buildRoot}images/favicon/`,
  fonts: `${buildRoot}fonts/`,
}

exports.buildRoot = buildRoot
exports.srcRoot = srcRoot
