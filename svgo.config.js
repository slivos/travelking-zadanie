module.exports = {
  js2svg: {
    indent: 2,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
        },
      },
    },
    'removeDoctype',
    'removeComments',
  ],
};
