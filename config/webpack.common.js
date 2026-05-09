const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // contenthash：根据文件内容生成哈希值，只有内容改变时才会改变哈希值，适合生产环境。
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        /**
         * React 项目为什么要 Babel？
         *
         * 因为浏览器不支持 JSX 语法和一些现代 JavaScript(ES6+)特性。Babel 可以将这些代码转换成浏览器能够理解的格式。
         */
        use: 'babel-loader',
      },
      {
        // 支持图片和字体资源
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    // 自动补全扩展名，支持 .js 和 .jsx 文件
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          minChunks: 2,
          name: 'common',
          reuseExistingChunk: true,
          priority: 5,
        },
      },
    },
  },
};
