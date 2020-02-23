import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import px2rem from 'postcss-plugin-px2rem';
import px2remConfig from "./px2rem.config";


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, './build'),
  assets: 'assets/',
};

module.exports = {
  devtool: false,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./app/index.js', './styles/scss/main.scss'],
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[hash].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: false, url: false }, // url: false - relative urls
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: [
                require('autoprefixer'),
                require('css-mqpacker'),
                require('cssnano')({
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
                px2rem(px2remConfig)
              ]
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
              name: 'assets/img/[name][hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
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
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/img/static'), to: 'assets/img/static' }, // no import js
      { from: path.resolve(__dirname, './src/styles/font'), to: `${PATHS.assets}/font` },
      { from: path.resolve(__dirname, './src/data'), to: 'data' },
      { from: path.resolve(__dirname, './src/404'), to: '' },
    ]),
    new DotenvPlugin({
      path: 'env/.env.production',
    }),
    new DotenvPlugin({
      path: 'env/.env.firebase',
    }),
    new CleanWebpackPlugin([PATHS.dist]),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
      chunkFilename: `${PATHS.assets}[id].[hash].css`,
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
        mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
        devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
        outputPath: 'assets/favicon',
        favicons: {
          appName: 'my-app',
          appDescription: 'My awesome App',
          developerName: 'Me',
          developerURL: null, // prevent retrieving from the nearest package.json
          background: '#ddd',
          theme_color: '#333',
          icons: {
            android: false, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
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
};
