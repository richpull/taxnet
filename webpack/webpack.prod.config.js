const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const px2rem = require('postcss-plugin-px2rem');
const autoprefixer = require( 'autoprefixer');
const cssMqPacker = require('css-mqpacker');
const cssNano = require('cssnano');
const {options, pathConfig, baseConfig, styleLoaders} = require('./webpack.base.config');
const merge = require('webpack-merge');

const productionConfig = merge(baseConfig, {
  mode : "production",
  devtool: false,
  output: {
    path: pathConfig.dist,
    filename: `${pathConfig.assets}/js/[name].[hash].js`,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: options.exclude,
        use: [
          {
            loader: 'babel-loader',
            options : {
              plugins: [
                "@babel/plugin-transform-runtime",
                ['@babel/plugin-syntax-dynamic-import'],
                ["react-css-modules"], // , {"generateScopedName": cssModuleClassName}
                ["transform-react-remove-prop-types", {
                  mode : "remove",
                  removeImport : true,
                  ignoreFilenames : ["node_modules"]
                }],
                "@babel/plugin-transform-react-constant-elements",
                "@babel/plugin-transform-react-inline-elements"
              ],
            }
          }
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true },
          },
          merge(styleLoaders.css, {
            options : {
              sourceMap: false, url: false,
            }
          }),
          merge(styleLoaders.post, {
            options : {
              sourceMap: false,
              plugins : [
                autoprefixer(),
                cssMqPacker(),
                cssNano(options.cssNanoConfig),
                px2rem(options.pxRemConfig)
              ]
            }
          }),
          styleLoaders.sass,
        ]
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${pathConfig.assets}/[path][name][hash].[ext]`,
              publicPath: pathConfig.prefix
            },
          }
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          }
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: `${pathConfig.context}/styles/font`, to: `${pathConfig.assets}/font` },
      { from: `${pathConfig.context}/data`, to: 'data' },
      { from: `${pathConfig.context}/404`, to: '' },
    ]),
    new DotenvPlugin({
      path: `${pathConfig.env}/.env.production`,
    }),
    new DotenvPlugin({
      path: `${pathConfig.env}/.env.firebase`,
    }),
    new CleanWebpackPlugin(['build', 'dist'], {
      root : pathConfig.base
    }),
    new MiniCssExtractPlugin({
      filename: `${pathConfig.assets}/css/[name].[hash].css`,
      chunkFilename: `${pathConfig.assets}/[id].[hash].css`,
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: true,
          },
        },
      }),
      new FaviconsWebpackPlugin({
        logo: './favicon/logo.svg',
        mode: 'webapp',
        devMode: 'webapp',
        publicPath: pathConfig.assets,
        outputPath: `${pathConfig.assets}/favicon`,
        prefix: 'favicon/',
        favicons: {
          appName: 'my-app',
          appDescription: 'My awesome App',
          developerName: 'Me',
          developerURL: null,
          background: '#ddd',
          theme_color: '#333',
          icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: true,
            windows: true,
            yandex: false,
          },
        },
      }),
      new ImageMinPlugin({
        test: /\.(png|jpe?g|gif|svg)$/,
      }),
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: { sourceMap: false },
      }),
    ],
  },
});
module.exports = new Promise((resolve) => {
  resolve(productionConfig)
});

