# consoln

轻量、简洁、可扩展的console控制台

### 特性

* 没有日志等级概念，可以灵活的配置每个日志类型

* 支持日志作用域，默认全局匹配，通过环境变量consoln限定作用域范围

* 日志定期存盘，默认间隔3s

* 日志拆分，文件按天保存到logger目录下

* 自定义cli显示内容格式及文件保存格式

* 显示格式化的彩色文本、图标日志

* 可扩展自定义日志类型

* 配置简单，易定制


### 示例

<!-- <img src="demo.png"> -->

```js
const consoln = require('consoln');

consoln.log('hellow log')

consoln.success('hellow success')

consoln.warn({ a: 1 })

consoln.error(new Error(''))

consoln.success('888')
```

### Install

```
npm install consoln
```


### 开发环境配置

开发环境下默认仅显示日志，不存盘。通过consoln.development()配置覆盖默认行为

consoln.development(options)

* `options` *Object* 自定义配置选项，可选

   * `$type` *Object* 类型配置选项，$type对应类型名称

      * `show` *Boolean, Function* 在cli中显示log，当值为函数时表示使用自定义显示格式

      * `save` *Boolean, Function* 是否保存至文件，当值为函数时表示使用自定义存储格式，默认为false

      * `filename` *String* 保存文件名

      * `action` *Function* 覆盖默认consoln的处理逻辑，或为自定义consoln添加处理逻辑（！谨慎操作）


##### 默认配置

```js
consoln.development({
   "log": {
      "show": true,
      "save": false,
      "filename": "log.log"
   },
   "success": {
      "show": true,
      "save": false,
      "filename": "success.log"
   },
   "warn": {
      "show": true,
      "save": false,
      "filename": "warning.log"
   },
   "error": {
      "show": true,
      "save": false,
      "filename": "error.log"
   }
})
```


### 生产环境配置

生产环境下默认不显示日志，也不存盘。通过consoln.production()配置开启日志存盘功能。

consoln.production(options)

* `options` *Object* 自定义配置选项，可选

   * `$type` *Object* 类型配置选项，$type对应类型名称

      * `save` *Boolean, Function*  是否保存至文件，当值为函数时表示使用自定义存储格式，默认为false

      * `filename` *String* 保存文件名

      * `action` *Function* 覆盖默认consoln的处理逻辑，或为自定义consoln添加处理逻辑（！谨慎操作）


##### 默认配置

```js
consoln.production({
   "log": {
      "save": false,
      "filename": "log.log"
   },
   "success": {
      "save": false,
      "filename": "success.log"
   },
   "warn": {
      "save": true,
      "filename": "warning.log"
   },
   "error": {
      "save": true,
      "filename": "error.log"
   },
})
```

### 自定义显示和存储格式

在consoln中可以很方便的定制日志显示格式和存储格式，在自定义配置函数中绑定了一些常用日志属性，帮助快速合成日志格式。

#### 可用日志属性如下：

* `this.getDate()` *Function* 生成日志时间函数

* `this.parameter(argv)` *Function* argv参数处理

* `this.pid` *String* 进程id

* `this.hostname` *String* 主机名称

* `this.type` *String* 日志类型


```js
consoln.development({
   "success": {
      "save": true,
      show(argv) {
         // 显示格式
         console.log(`\x1b[32m😊  ${this.type} [${this.getDate()}] \x1b[39m`, ...argv)
      }
   },
   "warn": {
      show(argv) {
         console.log(`\x1b[32m🐷  ${this.type} [${this.getDate()}] \x1b[39m`, ...argv)
      },
      save(argv) {
         // 保存为JSON格式
         return JSON.stringify({
            date: this.getDate(),
            type: this.type,
            pid: this.pid,
            hostname: this.hostname,
            argv
         })
      }
   },
   "error": {
      save(argv) {
         // 保存为TEXT格式
         return `[${this.getDate()}] ${this.type} ${this.pid} ${this.hostname} ${argv}`
      }
   }
})
```


### 日志作用域

日志作用域的使用方法与debug模块类似，区别如下：

* debug默认不显示log，consoln默认显示log，通过consoln.production()切换到生产环境后关闭日志。

* debug使用“debug”作为环境变量名，consoln使用“consoln”作为环境变量名。

* debug的环境变量值支持模糊匹配，consoln不支持模糊匹配，但支持精确匹配多个作用域。

```js
const app = require('consoln')('app');

app.success('ok');
```