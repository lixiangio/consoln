import os from 'os';
import helper from './helper.js';
import common from './common.js';
import timer from './timer.js';
import createStream from './createStream.js';

const { logs, stream } = common;
const { parameter, getDate } = helper;

const pid = process.pid;
const hostname = os.hostname();


/**
 * 惰性创建 stream
 * @param type 
 */
function getSave(type: string) {

   createStream(type).then(value => stream[type] = value)

   return function (argv) {

      const result = parameter(argv);

      logs.push({ type, value: `[${getDate()}] ${type} ${pid} '${hostname}' ${result}` });

   }

}

const options = {
   "log": {
      get save() {
         return getSave("log");
      }
   },
   "success": {
      get save() {
         return getSave("success");
      },
   },
   "info": {
      get save() {
         return getSave("info");
      },
   },
   "warn": {
      get save() {
         return getSave("warn");
      },
   },
   "error": {
      get save() {
         return getSave("error");
      },
   }
}

/**
 * 配置函数
 */
export default function (config = {}) {

   timer(config); // 启用定时器

   return options;

};