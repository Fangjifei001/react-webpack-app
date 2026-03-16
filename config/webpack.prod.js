// webpack-merge：区分开发环境 / 生产环境
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    // 生产环境配置，有了这个配置，Webpack 会自动开启 Tree Shaking。
    mode: "production"
});