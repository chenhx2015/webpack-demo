const path = require("path");
const HtmlWebpacklugin = require("html-webpack-plugin");
// 通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。让我们完成这个需求: clean-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const MyDemoPlugin = require("./plugin/console-plugin");

// webpack 最出色的功能之一就是：除了 javascript,还可以通过 loader 引入任何其他类型的文件
// 在 entry 添加 src/print.js 作为新的入口起点（print），然后修改 output，以便根据入口起点名称动态生成 bundle 名称
module.exports = {
  // entry: './src/index.js',
  entry: {
    app: "./src/index.js",
    // print: './src/print.js'
  },
  devtool: "inline-source-map", // 不要用于生产环境，将编译后的代码映射回原始源代码，为了更容易地追踪错误和警告
  // 告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件,再添加start脚本直接运行开发服务器
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  module: {
    rules: [
      // 加载css资源，就能使用import导入使用了
      {
        test: /\.css$/, // 注意这里没有引号，是个正则
        use: ["style-loader", "css-loader"],
      },
      //         // 加载图片资源，可以 import 图片使用了
      //         {
      //             test: /\.(png|svg|jpg|gif)$/,
      //             use: [
      //                 'file-loader'
      //             ]
      //         },
      //         // 加载字体
      //         {
      //             test: /\.(woff|woff2|eot|ttf|otf)$/,
      //             use: [
      //                 'file-loader'
      //             ]
      //         },
      //         // 加载数据，可加载的有用资源还有数据，如json 文件，csv,tsv, xml,导入这三种需要使用 csv-loader, xml-loader
      //         {
      //             test: /\.(csv|tsv)$/,
      //             use: [
      //                 'csv-loader'
      //             ]
      //         },
      //         {
      //             test: /\.xml$/,
      //             use: [
      //                 'xml-loader'
      //             ]
      //         }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpacklugin({
      title: "Output Management",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MyDemoPlugin(),
  ],
  output: {
    // filename: 'bundle.js',
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // todo path.resolve 方法
    // publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问，我们稍后再设置端口号
    publicPath: "/",
  },
};
