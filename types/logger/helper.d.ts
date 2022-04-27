/**
 * 获取本地格式化时分秒
 */
declare function getHours(): string;
/**
 * 获取本地格式化时间
 */
declare function getDate(): string;
/**
 * log 参数序列化为字符串
 */
declare function parameter(argv: any[]): any[];
declare const _default: {
    parameter: typeof parameter;
    getHours: typeof getHours;
    getDate: typeof getDate;
};
export default _default;
