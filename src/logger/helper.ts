/**
 * 获取本地格式化时分秒
 */
function getHours() {

   const nowDate = new Date()

   const hours = nowDate.getHours()

   const minutes = nowDate.getMinutes()

   const seconds = nowDate.getSeconds()

   return `${hours}:${minutes}:${seconds}`;

}


/**
 * 获取本地格式化时间
 */
function getDate() {

   const nowDate = new Date()

   const year = nowDate.getFullYear()

   const month = nowDate.getMonth()

   const day = nowDate.getDate()

   const hours = nowDate.getHours()

   const minutes = nowDate.getMinutes()

   const seconds = nowDate.getSeconds()

   return `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`;

}

/**
 * log 参数序列化为字符串
 */
function parameter(argv: any[]) {

   const result = [];

   for (const key in argv) {

      const item = argv[key];

      if (item instanceof Error) {
         result[key] = item.stack;
      } else if (item instanceof Object) {
         result[key] = JSON.stringify(item);
      } else {
         result[key] = item;
      }

   }

   return result;

}

export default {
   parameter,
   getHours,
   getDate,
}