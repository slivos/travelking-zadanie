const paths = require('./paths')

exports.twigLayout = `${paths.src.layouts}*.twig`

exports.twigLayoutStylebook = `${paths.src.layouts}stylebook/*.twig`

exports.html = [`${paths.buildRoot}*.html`]

exports.scss = [`${paths.srcRoot}**/*.scss`]

exports.json = [`${paths.src.components}**/*.json`, `${paths.src.data}**/*.json`]

exports.twig = [`${paths.srcRoot}**/*.twig`, `./stylebook/**/*.twig`]

exports.svg = [`${paths.src.images}**/*.svg`]

exports.js = [`${paths.srcRoot}**/*.js`,]

exports.favIconFiles = [`${paths.src.images}favicon/*.{xml,ico,webmanifest}`]

exports.images = [`${paths.src.images}/**/*.{png,jpg,jpeg,webp}`]

exports.videos = [`${paths.srcRoot}videos/**/*.mp4`]

exports.fonts = [`${paths.src.fonts}/**/*`];
