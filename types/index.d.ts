interface Options {
    [name: string]: {
        show(argv: any[]): void;
    };
}
interface Consoln {
    /**
     * 添加新的 consoln 方法或覆盖已有 consoln 方法
     */
    use(options: Options): void;
    /**
     * 隐藏log
     */
    show(state: boolean): void;
    /**
     * 作用域
     * @param name 作用域名称
     */
    scope(name: string): object;
    envs: unknown;
    log?(...argv: any[]): void;
    success?(...argv: any[]): void;
    info?(...argv: any[]): void;
    warn?(...argv: any[]): void;
    error?(...argv: any[]): void;
}
declare const consoln: Consoln;
export default consoln;
