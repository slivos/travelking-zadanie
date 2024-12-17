'use strict'

const paths = require('./paths')

exports.emMediaQuery = {
  precision: 3
}

exports.sass = {
  includePaths: [
    paths.nodeModulesRoot,
    "src/",
    "./",
  ],
}

exports.autoprefixer = {
  overrideBrowserslist: [
    'last 2 versions',
    'not ie > 0',
    'not ie_mob > 0'
  ]
}

exports.pxtorem = {
  rootValue: 16,
  propList: ['*'],
  selectorBlackList: [/^body$/]
}

exports.html = {
  indent_size: 2,
  indent_style: "space",
  max_preserve_newlines: 1,
  end_with_newline: true
}

exports.browsersync = {
  server: {
    baseDir: paths.buildRoot
  },
  watch: true,
}

exports.twig = {
  filters: [
    {
      name: "trans",
      func: function (args) {
        return args;
      }
    }
  ],
  namespaces: {
    Components: paths.src.components,
    Images: paths.build.images,
    Stylebook: paths.stylebookRoot
  }
}

exports.purgeCss = {
  content: [`${paths.srcRoot}**/*.{js,ts,tsx,twig}`],
  safelist: ["d-none", "row", "col-md-6", "ratio", "ratio-16x9", "container-fluid", "container"],
  defaultExtractor: (content) => {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  }
}
