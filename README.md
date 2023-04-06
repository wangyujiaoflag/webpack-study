## 用 webpack 从零开始搭建 react 项目

### 1、运行

```js
npm run start
```

### 2、打包

```js
npm run build
```

### 3、具体步骤

```js
// 创建项目
mkdir webpack-study
cd webpack-study

// 初始化项目
npm init -y

// 创建项目基本要用的文件
public/index.html // root元素
src/index.tsx // 入口文件
src/App.tsx // 展示组件

// 安装webpack以及脚手架
npm install webpack webpack-cli webpack-dev-server --save-dev

// 创建webpack.config.js文件，进行配置
// -----entry-----
./src/index.tsx
// -----output 存放在当前目录下dist文件夹中-----
const path = require("path");
const output = {
  publicPath: '/'
  path: path.resolve(__dirname, "./dist"),
  filename: "[name].[contenthash].bundle.js", // 占位符，保证内容是正确的
  clean: true, // 每次构建时先清空
}
// -----loader-----
// loader-样式
npm install -D style-loader css-loader sass-loader
// loader-图片
// loader-ts、tsx，类型支持 这里需要创建tsconfig.json文件
npm install -D typescript ts-loader
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react-jsx", // react-jsx 可以不用在每个组件都导入react
    "allowJs": true,
    "allowSyntheticDefaultImports": true, // react必须
    "moduleResolution": "node"
  }
}
// loader-babel
npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader

// -----react、路由相关-----
npm install -D react react-dom @types/react @types/react-dom
npm install -D react-router-dom

// -----plugin-----
// 保证html中的script是最新的
npm install -D html-webpack-plugin
// css样式单独打包、不内置到html中
npm install -D mini-css-extract-plugin
// 打包忽略node_modules
npm install webpack-node-externals --save-dev

// -----devServer-----
const devServer = {
  open: true, // 自动打开浏览器
  hot: true,// 热更新
  port: 8000, // 端口号
  // https://blog.csdn.net/zwkkkk1/article/details/83411071
  historyApiFallback: true, // 解决react-router刷新后can not get /xxx
  // 代理
  proxy: {
      '/api': 'http://localhost:3000',
  },
}

// -----resolve-----
const resolve = resolve: {
    //尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".tsx", ".ts", ".js"],
    // 设置引用别名
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
},
// 设置别名，在tsconfig.json中需要添加配置，否则会报错：TS2307: Cannot find module '@/component/Input' or its corresponding type declarations.
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}

// -----debug-----
devtool: "inline-source-map"
```

```js
// 可以做的优化
css压缩;
压缩静态资源
tree shaking webpack5已自动开启
去除不需要的依赖
代码分割
缓存优化
```

```ts
// other
autoprefixer: 通用前缀;
// 什么是esnext
//juejin.cn/post/7028417636811669534
// tsconfig
//www.tslang.cn/docs/handbook/compiler-options.html
```
