## consoln

轻量、简洁、可扩展的console控制台

### 特性

* 通过扩展机制实现控制台定制、日志存储、消息订阅等功能

* 无扩展时可作为美化版的console使用

* 支持console作用域，可视为轻量版的debug模块

* 没有日志等级概念，使配置更加灵活，缺点是配置相对繁琐

* 日志定期存盘，间隔3s存盘

* 日志拆分，文件按天保存到logger目录下

* 显示格式化的彩色文本、图标日志

* 支持扩展自定义日志类型


### Install

```
npm install consoln
```

### 示例

```js
// 基础示例

const consoln = require('consoln');

consoln.log('hellow')

consoln.success('hellow success')

consoln.warn({ a: "warn" })

consoln.error(new Error('xx'))

consoln.success('888')
```

```js
// 日志存档

const consoln = require('consoln');
const logger = require('@consoln/logger');

consoln.show(false); // 不显示log

consoln.use(logger); // 启用日志存档功能

consoln.warn({ a: "warn" })

consoln.error(new Error('xx'))
```

### consoln

使用方法与console类似

#### consoln.use(options) 

consoln的自定义扩展函数，options中的同名属性会被覆盖

* `options` *Object* 自定义配置选项

   * `$type` *Object* 类型配置选项，$type对应类型名称

      * `$method` *Function* 调用consoln.$type()方法时执行

##### 参考默认配置

```js
consoln.use({
   "log": {
      show(argv) {
         console.log(`\x1b[34m●\x1b[39m`, ...argv);
      }
   },
   "success": {
      show(argv) {
         console.log(`\x1b[32m√\x1b[39m`, ...argv);
      }
   },
   "info": {
      show(argv) {
         console.log(`\x1b[36mi\x1b[39m`, ...argv);
      }
   },
   "warn": {
      show(argv) {
         console.log(`\x1b[33m⚠\x1b[39m`, ...argv);
      }
   },
   "error": {
      show(argv) {
         console.log(`\x1b[31m✖\x1b[39m`, ...argv);
      }
   },
})
```

#### consoln.show(false)

关闭控制台log显示功能，提升性能

#### consoln.log()

#### consoln.success()

#### consoln.warn()

#### consoln.error()

#### consoln.info()


### 作用域

日志作用域的使用方法与debug模块类似，区别如下：

* debug默认不显示log，consoln默认显示log，通过consoln.production()切换到生产环境后关闭日志。

* debug使用“debug”作为环境变量名，consoln使用“consoln”作为环境变量名。

* debug的环境变量值支持模糊匹配，consoln不支持模糊匹配，但支持精确匹配多个作用域。

```js
const consoln = require('consoln');
const debug = consoln.scope('debug');
const user = consoln.scope('user');

debug.log('hellow debug');

debug.success('hellow debug');

user.log('hellow user');

user.success('hellow user');
```