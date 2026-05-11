const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  /**
   * source-map：生成独立 .map，Chrome 对「映射回 src/*.jsx」兼容性最好（不依赖 eval 内联 map）。
   * 不要用 eval-cheap-*：cheap 缺列信息，断点易错位。
   */
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT || 3000,
    /**
     * React Router 为什么要 historyApiFallback？
     *
     * 这是 SPA 必须配置，否则刷新路由会 404。
     *
     * 因为 React Router 使用了 HTML5 的 History API 来实现前端路由。
     * 当你在浏览器中直接访问一个路由（例如 http://localhost:3000/about）时，开发服务器会尝试找到对应的文件，但实际上这个文件并不存在，因为所有的路由都是由 React Router 处理的。
     * historyApiFallback 选项告诉开发服务器在找不到文件时返回 index.html，这样 React Router 就可以正确地处理路由并渲染相应的组件了。
     */
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        /**
         * style-loader：解析 CSS import
         * css-loader：把 CSS 插入 DOM
         */
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
});
