## consoln

轻量、简洁、可扩展的 console 控制台

### 特性

- 通过扩展机制实现控制台定制、日志存储、消息订阅等功能

- 无扩展时可作为美化版的 console 使用

- 支持 console 作用域，可视为轻量版的 debug 模块

- 没有日志等级概念，使配置更加灵活，缺点是配置相对繁琐

- 日志定期存盘，间隔 3s 存盘

- 日志拆分，文件按天保存到 logger 目录下

- 显示格式化的彩色文本、图标日志

- 支持扩展自定义日志类型

### Install

```
npm install consoln
```

### 示例

```js
// 基础示例

import consoln from "consoln";

consoln.log("hellow");

consoln.success("hellow success");

consoln.warn({ a: "warn" });

consoln.error(new Error("xx"));

consoln.success("888");
```

```js
// 扩展日志存档

import consoln from "consoln";
import logger from "consoln/logger";

consoln.show(false); // 不显示log

consoln.use(logger({ interval: 5000 })); // 添加日志存档，并设定存储间隔为5s

consoln.warn({ a: "warn" });

consoln.error(new Error("xx"));
```

### consoln

使用方法与 console 类似

#### consoln.use(options)

consoln 的自定义扩展函数，options 中的同名属性会被覆盖

- `options` _Object_ 自定义配置选项

  - `$type` _Object_ 类型配置选项，$type 对应类型名称

    - `$method` _Function_ 调用 consoln.$type()方法时执行

##### 参考默认配置

```js
consoln.use({
  log: {
    show(argv) {
      console.log(`\x1b[34m●\x1b[39m`, ...argv);
    },
  },
  success: {
    show(argv) {
      console.log(`\x1b[32m√\x1b[39m`, ...argv);
    },
  },
  info: {
    show(argv) {
      console.log(`\x1b[36mi\x1b[39m`, ...argv);
    },
  },
  warn: {
    show(argv) {
      console.log(`\x1b[33m⚠\x1b[39m`, ...argv);
    },
  },
  error: {
    show(argv) {
      console.log(`\x1b[31m✖\x1b[39m`, ...argv);
    },
  },
});
```

#### consoln.show(false)

关闭控制台 log 显示功能，提升性能

#### consoln.log()

#### consoln.success()

#### consoln.warn()

#### consoln.error()

#### consoln.info()

### 作用域

日志作用域的使用方法与 debug 模块类似，区别如下：

- debug 默认不显示 log，consoln 默认显示 log，通过 consoln.production()切换到生产环境后关闭日志。

- 与 debug 库一样，consoln 也使用 debug 环境变量名来约束 console 的内容输出。

- debug 库的环境变量值支持模糊匹配，consoln 不支持模糊匹配，但支持精确匹配多个作用域。

#### 示例

```
// Linux

debug=demo node ./test/scope.js
debug=demo,user node ./test/scope.js
```

```js
import consoln from "consoln";
const debug = consoln.scope("debug");
const user = consoln.scope("user");

debug.log("hellow debug");

debug.success("hellow debug");

user.log("hellow user");

user.success("hellow user");
```

## consoln/logger

consoln 的日志存储扩展，每天定时拆分日志文件；

#### 示例

```js
import consoln from "consoln";
import logger from "consoln/logger";

consoln.use(logger({ interval: 5000 })); // 启用日志存档，并设定存储间隔为5s

consoln.warn({ a: "warn" });

consoln.error(new Error("xx"));
```

### logger(config)

- config `Object` - 插件配置项

  - interval `String` - 存盘周期，默认值为 5000ms
