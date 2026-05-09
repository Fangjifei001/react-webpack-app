// webpack-merge：区分开发环境 / 生产环境
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
/**
 * MiniCssExtractPlugin 是一个 Webpack 插件，作用是：
 * 把打包后的 CSS 从 JS bundle 里提取出来，生成独立的 .css 文件。
 *
 * 这是 生产环境构建 React / Web 项目时非常重要的一步优化。
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  // production 模式会自动启用一些优化，比如压缩代码、tree shaking 等，适合部署到生产环境。
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    /**
     * minimize：Webpack（v5）中生产模式默认启用代码压缩，生产环境默认开启。
     * V5之前需要安装 terser-webpack-plugin
     *
     * 它会删除无用代码，删除注释，删除 console.log，删除 debugger，压缩变量名等，从而减小文件体积，提高加载速度。
     */
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
});
