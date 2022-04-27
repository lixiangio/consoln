import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

/**
 * 创建可写文件流
 */
async function createStream(filename: string) {

   const nowDate = new Date();

   const year = nowDate.getFullYear();

   const month = nowDate.getMonth();

   const day = nowDate.getDate();

   const dir = `logs/${year}/${month + 1}/${day}/`;

   await fsp.mkdir(dir, { recursive: true }).catch(error => {
      throw new Error(error);
   })

   const filePath = path.join(dir, `${filename}.log`);

   return fs.createWriteStream(filePath, { "flags": "a" });

}

export default createStream;