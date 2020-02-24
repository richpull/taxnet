import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import autoprefixer from 'autoprefixer';
import px2rem from 'postcss-plugin-px2rem';
import px2remConfig from './px2rem.config';

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./app/index.js', './styles/scss/main.scss'],
  },
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
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4000',
    //   },
    // },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@img': path.resolve(__dirname, './src/img'),
      '@store': path.resolve(__dirname, './src/app/store'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer, px2rem(px2remConfig)],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './img', to: 'img' },
      { from: './styles/font/', to: 'font' },
      { from: './data', to: 'data' },
    ]),
    new DotenvPlugin({
      path: 'env/.env.development',
    }),
    new DotenvPlugin({
      path: 'env/.env.firebase',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    }),
  ],
};
