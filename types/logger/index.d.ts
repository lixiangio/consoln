/**
 * 配置函数
 */
export default function (config?: {}): {
    log: {
        readonly save: (argv: any) => void;
    };
    success: {
        readonly save: (argv: any) => void;
    };
    info: {
        readonly save: (argv: any) => void;
    };
    warn: {
        readonly save: (argv: any) => void;
    };
    error: {
        readonly save: (argv: any) => void;
    };
};
