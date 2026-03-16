const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    // contenthash：根据文件内容生成哈希值，只有内容改变时才会改变哈希值，适合生产环境。
    filename: "[name].[contenthash].js",
    clean: true
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
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        /**
         * style-loader：解析 CSS import
         * css-loader：把 CSS 插入 DOM
         */
        use: ["style-loader", "css-loader"]
      },
      { // 支持图片和字体资源
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  devServer: {
    port: 3000,
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
    open: true
  }
};