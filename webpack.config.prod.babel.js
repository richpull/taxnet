import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpack from "webpack";

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, './build'),
  assets: 'assets/',
};

module.exports = {
  devtool: false,
  entry: {
    main: ['./src/app/index.js', './src/styles/scss/main.scss'],
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
            loader: 'babel-loader',
            options: {
              plugins: [['@babel/plugin-syntax-dynamic-import'],["transform-react-remove-prop-types", { "mode": "remove", "removeImport" : true, "ignoreFilenames": ["node_modules"]}]],
            },
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
            options: { sourceMap: false, config: { path: `./postcss.config.js` } },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
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
    extensions: ['ts', '.js', '.jsx', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'assets/img' },
      { from: 'src/styles/font/', to: `${PATHS.assets}/font` },
      { from: 'data', to: 'data' },
      { from: 'src/404/', to: '' }
    ]),
    new webpack.DefinePlugin({
      'process.env':{
        'API_DATA_URL': JSON.stringify('data'),
      }
    }),
    //new webpack.SourceMapDevToolPlugin({
    //  filename: '[name].js.map',
    //  exclude: ['bundle.js'],
    //}),
    new CleanWebpackPlugin([PATHS.dist]),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
      chunkFilename: '[id].[hash].styles',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
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
      new ImageMinPlugin({
        test: /\.(png|jpe?g|gif|svg)$/,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { sourceMap: false },
      }),
    ],
  },
};
