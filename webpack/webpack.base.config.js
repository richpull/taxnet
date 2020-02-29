const path = require('path');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-plugin-px2rem');
const pathConfig = {
  context : path.resolve(__dirname, '../src'),
  src : path.resolve(__dirname, '../src'),
  env : path.resolve(__dirname, '../env'),
  dist: path.join(__dirname, '../build'),
  assets: 'assets',
  prefix : '/taxnet/',
  base : path.resolve(__dirname, '..')
}
const exclude = /node_modules/;
const cssModuleClassName = '[local]___[hash:base64:5]';
const cssNanoConfig = {
  preset: [
    'default',
    {
      discardComments: {
        removeAll: true,
      },
    },
  ],
}
const pxRemConfig = {
  rootValue: 10,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  exclude,
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
}
const styleLoaders = {
  style : {
    loader: 'style-loader',
    options: { sourceMap: false },
  },
  css : {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      import: true,
      modules: {
        getLocalIdent: (loaderContext, localIdentName, localName) => {
          if (path.basename(loaderContext.resourcePath).search(/\.module\.(sa|sc|c)ss$/i) === -1) {
            return localName
          }
        },
        localIdentName : cssModuleClassName
      },
      importLoaders: 2,
    },
  },
  post : {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
      plugins: [autoprefixer(), px2rem(pxRemConfig)],
    },
  },
  sass : {
    loader: 'sass-loader',
    options: { sourceMap: false },
  }
}

const baseConfig = {
  context: pathConfig.context,
  entry: {
    main: ['./app/index.js', './styles/scss/index.scss'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      '@': pathConfig.src,
      '@styles': `${pathConfig.src}/styles`,
      '@img':  `${pathConfig.src}/img`,
      '@store':  `${pathConfig.src}/app/store`,
    },
  },
}
module.exports.pathConfig = pathConfig;
module.exports.baseConfig = baseConfig;
module.exports.styleLoaders = styleLoaders;
module.exports.options = {
  exclude,
  cssModuleClassName,
  cssNanoConfig,
  pxRemConfig
};
