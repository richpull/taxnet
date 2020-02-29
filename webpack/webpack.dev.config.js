const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const { baseConfig, pathConfig, options, styleLoaders} = require('./webpack.base.config');

const developmentConfig = merge(baseConfig, {
  mode: "development",
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    https: false,
    port: 8081,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude : options.exclude,
        use : [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                "@babel/plugin-transform-runtime",
                ['@babel/plugin-syntax-dynamic-import'],
                ["react-css-modules"] // , {"generateScopedName": cssModuleClassName}
              ],
            },
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          styleLoaders.style,
          styleLoaders.css,
          styleLoaders.post,
          styleLoaders.sass
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          }
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use : [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          }
        ]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './img', to: 'img' },
      { from: './styles/font/', to: 'font' },
      { from: './data', to: 'data' },
    ]),
    new DotenvPlugin({
      path: `${pathConfig.env}/.env.development`,
    }),
    new DotenvPlugin({
      path: `${pathConfig.env}/.env.firebase`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    }),
  ],
});
module.exports = new Promise((resolve) => {
  resolve(developmentConfig)
});
