### manage output
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Output Management</title>
    <script src="./print.bundle.js"></script>
</head>
<body>
    <!-- <script src="./bundle.js"></script> -->
    <!-- 手动引入所有的资源，一旦应用增长，如果文件名使用哈希，并输出多个bundle，手动修改则会变得困难 -->
    <!-- 所以可以通过一些插件，使这个过程更易操控,如下修改 -->

    <!-- 如果有多个入口文件或者是添加的新的文件，则会生成新的文件名字，但是此文件引用的仍然是旧的名字，解决：HtmlWebpackPlugin -->
    <script src="./app.bundle.js"></script>
</body>

### development
使用 source map --- 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置 --> 将编译后的代码映射回原始源代码

### 选择一个开发工具
每次都要 npm run build 开发效率不高，麻烦,解决如下：
1. webpack's Watch Mode  -- 使用观察模式, package.json 中增加脚本 "watch": "webpack --watch",缺点：浏览器要手动刷新
2. webpack-dev-server  -->  多数场景使用这个
3. webpack-dev-middleware --> 是一个容器，它可以把webpack处理后的文件传递给一个服务器，webpack-dev-server 在内部使用了它
   npm install --save-dev express webpack-dev-middleware

到此：已经学会了如何自动编译代码，并运行一个简单的开发服务器(development server)

### 模块热替换 HMR
它允许在运行时更新各种模块，而无需进行完全刷新
适合开发环境。不适用于生产环境
new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()
注意：这个是使用开发服务器监听，npm start

### tree shaking
通常用于描述移除 javascript 上下文中未引用代码
将文件标记为无副作用 -->  压缩输出 --> uglifyjs 压缩插件

为了学会使用 tree shaking，你必须……

使用 ES2015 模块语法（即 import 和 export）。
在项目 package.json 文件中，添加一个 "sideEffects" 入口。
引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下.

注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除

### 生产环境构建
由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置
npm install --save-dev webpack-merge

### 代码分离
三种方法：入口起点，防止重复，动态导入
方法一：可能会有重复引入的模块 --> 使用CommonChunkPlugin 来移除重复的模块
方法二：CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
方法三：当涉及到动态代码拆分时，webpack 提供了两个类似的技术
1.使用符合 ECMAScript 提案 的 import() 语法 --- 优先选择这个
2.则是使用 webpack 特定的 require.ensure

### 缓存
如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。
重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件