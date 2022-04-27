/// <reference types="node" />
import fs from 'fs';
/**
 * 创建可写文件流
 */
declare function createStream(filename: string): Promise<fs.WriteStream>;
export default createStream;
