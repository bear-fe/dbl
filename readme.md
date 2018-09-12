
# dbl

阅读该文档前，请确定你的模块版本 1.0.8

## 功能

* 1、生成项目脚手架
* 2、基本构建功能，如css、js的合并、压缩等，打包后提取公共依赖
* 3、编译 less、sass、jsx、handlebars、ejs，并可配置增加新开发语言，均需要自己配置对应的 loader 实现
* 4、自动生成入口js文件script标签，直接加载子页面功能
* 5、模块管理，工具内核是webpack，webpack理念是将js、css、html模版、less、sass、ejs......通通视为资源，可以非常方便地进行模块化。
* 6、支持npm、bower模块，海量开源资源
* 7、支持 es2015
* 8、支持 cssnext，通俗地说也就是 CSS4
* 9、支持自动添加浏览器厂商前缀

## 前置工作

安装 node（4.2.2+）。

## 安装

``` shell
npm install -g @bear-fe/dbl
```

## 使用

创建一个目录，在当前目录打开控制台，初始化项目：
  
``` shell
dbl init 
```

初始化时可以选择使用模板：

``` shell
dbl init -t vue
```

目前支持以下模板：

1. `default` 不指定参数时的默认模板，默认兼容 IE8
1. `vue` 配置使用 vue 的模板

初始化以后需要安装依赖：

``` shell
npm install
```

每个项目都会有自己对应的依赖需要安装，默认情况下依赖的模块不会提交。

启动本地服务及mock服务，开发调试：

``` shell
dbl server
```

server 启动后，默认端口号是 3001 和 8001，访问地址为：127.0.0.1:3001，mock服务访问地址：127.0.0.1:8001

也可以自己指定端口号：

``` shell
dbl server -p 3002 -m 8002
```

这样访问地址为：127.0.0.1:3002，mock服务访问地址：127.0.0.1:8002

开发完成，打包，生成 build 结果：

``` shell 
dbl deploy
```

### 打包之前需要注意的事项

确保 package.json 文件里面的 name(项目名) 和 version(项目版本号) 正确，每次修改上线之前都应该升级一次版本号，以确保新上传的资源不会对线上现有资源造成影响。

项目名使用连字符，版本号可以从 0.0.1 开始

``` javascript
{
  "name": "project-name",
  "version": "0.0.1",
  "browserslist": [
    "last 2 version",
    "ie 8"
  ],
  ...
}
```

browserslist 属性是该项目的浏览器支持情况。

## 项目目录结构

``` shell
├── build/                 # 打包后文件目录，初始化时没有，打包后自动生成
├── doc/                   # mock 相关自动生成目录
├── mock2easy/             # mock 相关自动生成目录
├── node_modules/          # 模块自动生成目录，该目录不在 SVN 中提交
├── src/                   # 开发源代码目录
│   ├── components/        # vue 组件目录，需要自行创建
│   ├── css/               # 样式目录
│   ├── images/            # 图片目录
│   ├── layout/            # 页面布局文件目录
│   ├── pages/             # vue 页面组件目录，需要自行创建
│   ├── scripts/           # js 脚本目录
│   │   ├── common/        # 公共 js 文件
│   │   ├── plugins/       # js 插件
│   │   ├── common.js      # 所有页面都会加载的 js 文件
│   │   └── index.js       # 首页自动加载的 js 文件
│   ├── templates/         # 模板目录，需要自行创建
│   └── index.html         # 首页
├── .babelrc               # babel 配置文件
├── make-webpack.config.js # webpack 配置文件
├── package.json
├── package-lock.json
├── postcss.config.js      # PostCSS 配置文件
├── readme.md              # readme
├── webpack.config.js
└── webpack-dev.config.js
```

说明：

1. src 是开发目录。
1. html 文件放在 src 目录下。
1. src/index.html 是首页。
1. src/layout 是公共页面片段目录，用来放置一些页面头部，顶部，尾部之类的。引入方式请直接参考 src/index.html 页面。
1. src/scripts 是 js 目录。
1. 页面会自动生成 src/scripts/common.js 默认情况下每个页面都会自动引入这个 src/scripts/common.js 适合放入一些公用代码以及引入样式。
1. src/scripts 目录下的 .js 文件是入口文件，应与 src 中的 .html 文件名一一对应，例如：src/start.html，其对应加载的 js 应该是 src/scripts/start.js，该 js 文件会自动加载，无需手写。
1. 原则上 src/scripts 目录下面不再放置其它 js 文件，如果需要可以在 src/scripts 目录下面新建一个目录放置一些插件，比如 src/scripts/plugins 目录。
1. src/css 是样式目录，所有页面公用样式在 src/scripts/common.js 里面引入，引入方式直接查看 src/scripts/common.js 里面的代码，页面私有样式在页面私有的 js 文件里面引入。原有的页面引入了部分样式，只作示例，可以删除。
1. src/images 目录是图片目录。
1. 按照 webpack 规范，入口 .js 文件不可以被 require
1. 项目中的资源路径请不要使用/开头，因为打包时会找不到资源，请使用@/开头的路径，比如 `@/imgaes/`, `@/css`

## mock

启动server同时会启动一个mock程序，可以添加mock接口，即可在项目开发时使用。mock编辑器访问地址：

  127.0.0.1:8001

默认情况下所有 mock 接口必须以 .json 结尾作为后缀，便于区分，如果需要自己指定接口后缀，请添加 `-s` 参数：

``` shell
dbl server -s .html
```

## 更新记录：

### 1.0.8

1. vue-loader@15

### 1.0.7

1. webpack@4, babel-loader@8

### 1.0.6

1. 更改 html-loader 的配置

### 1.0.5

1. 更新文档

### 1.0.4

1. 更新文档

### 1.0.3

1. 删除部分不需要的模块

### 1.0.2

1. cssnano 增加 `safe: true` 参数，以免 z-index 属性计算错误

### 1.0.1

1. vue-loader 升级到 13.6.2
1. default 模板支持 IE8

### 1.0.0

1. 模块升级
1. 添加生成项目时模板选择功能 `dbl init -t vue`，不添加此参数是默认模板

### 0.5.8

1. babel-preset-es2015 -> babel-preset-env
1. html-withimg-loader -> html-loader
1. 删除 @yj 模块

### 0.5.7

1. 配置 vue, vue-router, vuex, vue-loader

### 0.5.6

1. 配置使用 cssnano 压缩 CSS
1. 配置 cssnext, autoprefixer，可以使用新增的语法，自动添加浏览器厂商前缀

### 0.5.5

1. 删除 ejs-loader, 无用
1. 升级 webpack 从 1.12.1 到 1.15.0
1. 配置 es2015

### 0.5.3

* 1、起始的目录页面不再依赖index.html中的script跳转，现在index.html可以在项目中随意使用或者删除了
* 2、可以在配置文件make-webpack-config中通过配置自定义起始页
* 3、模版中script.html中加载的jquery文件的src去掉了协议部分以自适应协议

### 0.5.2

* 启动服务及打包时，当检测到html文件对应的入口js文件不存在时，会自动创建了。

### 0.5.1

* 修复了上次更改导致html中单引号会引起编译异常的bug

### 0.5.0

* 1、解决了img标签src需要由js赋值的问题，现在可以直接在html中写img标签的src
* 2、在js中require加载html代码时，可以用html-withimg-loader处理图片问题
* 3、入口html不再使用handlebars模版处理，仍然提供加载子页面功能，不过语法更改为：#include("./xxx/xxx.html")
* 4、由于部分页面不需要任何js，提供一项黑科技避免自动生成script标签：head中添加一个<meta name="no-need-script" >

### 0.3.0

* 1、页面调试目录转移到虚拟目录/__build/，比如demo. html对应的地址变为http://127.0.0.1:3001/__build/demo.html，index. html中生成的目录已做相应更改
* 2、入口html页面将被handlebars-loader热处理，意味着可以使用{{> ./ handlebars/layout.hbs}}语法提取页面公共部分，参见demo.html
* 3、页面公共header项提取为layout.hbs，公共js提取为scripts.hbs，不再需要根据html名更改script的src，会自动生成。参见demo.html
* 4、mock时接口后缀默认是. json，但启动服务时支持设置其他后缀，方法示例：dbl server -s .htm
* 5、handlebars模版文件后缀可以简写为.hbs，handlebars-loader会处理，原. handlebars仍然可以使用

### 0.2.0

* 1、去除了支持spm模块的代码，因为支付宝已将spm的源下线
* 2、注意publicPath配置处，有各环境的发布路径，请根据需要切换

### 0.1.4

index.html中生成的页面链接后加上了页面title，方便查看
