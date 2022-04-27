import common from './common.js';
import createStream from './createStream.js';

const { logs, stream, } = common;

export default function (config) {

   const { interval = 5000 } = config;

   /**
    * 每天定时拆分日志文件
    */
   async function updateStream() {

      const nowDate = new Date();

      const nowTime = nowDate.getTime();

      const nextTime = nowDate.setHours(24, 0, 0);

      const awatiTime = nextTime - nowTime;

      await new Promise(resolve => setTimeout(resolve, awatiTime))

      for (const name in stream) {

         stream[name] = await createStream(name);

      }

      updateStream();

   }

   updateStream();

   // 默认每间隔5秒存盘
   setInterval(() => {

      for (const item of logs) {

         const { type, value } = item;

         stream[type].write(`${value}\n`);

      }

      logs.splice(0); // 清空队列

   }, interval);

}