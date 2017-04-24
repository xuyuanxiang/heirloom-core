# heirloom-core  [![NPM version](http://img.shields.io/npm/v/heirloom-core.svg?style=flat)](https://npmjs.org/package/heirloom-core)
 [![NPM Downloads](https://img.shields.io/npm/dm/heirloom-core.svg?style=flat)](https://npmjs.org/package/heirloom-core)
  [![Node.js Version](https://img.shields.io/node/v/heirloom-core.svg?style=flat)](http://nodejs.org/download/)
  [![Build Status](https://img.shields.io/travis/xuyuanxiang/heirloom-core/master.svg?style=flat-square)](https://travis-ci.org/xuyuanxiang/heirloom-core)

+ koa^2.2.0(http://koajs.com/)

定义标准接口及泛型，以不变应万变。

将当前热门的一些框架或工具封装一层后，作为接口的实现类以依赖的方式安装集成到项目。以应对将来项目演进过程中，换用更优的选择时，能够平滑替换。

## 安装

```npm
npm install heirloom-core --save
```

## 相关项目

遵循**规约重于配置的思想**所实现的一些插件，尽量减少业务以外不必要的代码量。

### [heirloom-static-plugin](https://github.com/xuyuanxiang/heirloom-static-plugin#heirloom-static-plugin)

用于打包构建客户端静态资源，具体请移步[查看详情](https://github.com/xuyuanxiang/heirloom-static-plugin#heirloom-static-plugin)。

### [heirloom-api-plugin](https://github.com/xuyuanxiang/heirloom-api-plugin)

用于包装后端RPC或其他各种服务，提供统一接口，具体请移步[查看详情]()。

### heirloom-security-plugin

TODO: coming soon...

用于保护请求资源已经接口鉴权的插件，目前有以下两种实现：

+ 传统账号／密码登录

+ JSON Web Token

+ OAuth2

## 工程目录

```yaml
server/
├── src/--------------------------------------项目源码
│   ├── engines/---------------------------------引擎
│   │   ├── KoaEngine.js----------------------------基于Engine接口，使用Koa框架的实现
│   │   └── index.js--------------------------------入口文件
│   ├── NormalServer.js--------------------------基于Server接口的一种常规实现
│   └── index.js---------------------------------入口文件
├── lib/--------------------------------------通过babel将src目录下的源码构建到该目录
└── index.js----------------------------------入口文件
```

## 基本概念

### Engine

Node第三方服务框架：Express/Koa等的封装，其接口定义如下（目前以Express/Koa等的接口为蓝本）：

```javascript
interface Engine {
    name: string;
    version: string;

    use(any: any):void;
    listen(port: number, callback: ()=>void):void;
    on(event: string, callback: (error: ?Error | ?any) => void):void;
}
```

### Plugin

基于服务器框架的中间件或一些业务功能模块的封装，其接口定义如下：

```javascript
interface Plugin {
    name: string;
    version: string;

    apply(): Array<any> | any | Generator<*> | (req: any, res: any, next: Function)=>void;
}
```

### Server

服务器，接口定义如下：

```javascript
interface Server {
    port: number;
    engine: Engine;

    apply(plugin: Plugin):void;
    start():void;
}
```