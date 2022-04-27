import base from './base.js';

interface Options {
   [name: string]: {
      show(argv: any[]): void
   }
}

const meta = {};
const empty = {};
function emptyFn() { };

interface Consoln {
   /**
    * 添加新的 consoln 方法或覆盖已有 consoln 方法
    */
   use(options: Options): void
   /**
    * 隐藏log
    */
   show(state: boolean): void
   /**
    * 作用域
    * @param name 作用域名称
    */
   scope(name: string): object
   envs: unknown
   log?(...argv: any[]): void
   success?(...argv: any[]): void
   info?(...argv: any[]): void
   warn?(...argv: any[]): void
   error?(...argv: any[]): void
}

const consoln: Consoln = {
   envs: undefined,
   use(options: Options = {}): void {

      for (const name in options) {

         if (meta[name] === undefined) {
            meta[name] = {};
            empty[name] = emptyFn;
         }

         const type = options[name];
         const ctx = meta[name];

         if (ctx) {

            for (const name in type) {

               const value = type[name];

               if (value instanceof Function) {

                  ctx[name] = value;

               } else {

                  delete ctx[name];

               }

            }

         } else {

            meta[name] = options[name];

         }

         const [f0, f1] = Object.keys(ctx);

         if (f1) {

            this[name] = function (...argv) {
               for (const name in ctx) {
                  ctx[name](argv);
               }
            }

         } else if (f0) {

            this[name] = function (...argv) {
               ctx[f0](argv);
            };

         } else {

            this[name] = emptyFn;

         }

      }

   },
   show(state: boolean): void {

      if (state === false) {

         for (const name in meta) {
            meta[name].show = emptyFn;
         }

      }

   },
   scope(name: string): object {

      let { envs } = this;

      if (envs === undefined) {
         const { debug } = process.env;
         if (debug) {
            envs = {};
            this.envs = envs;
            debug.split(',').forEach(env => envs[env.trim()] = true);
         }
      }

      if (envs) {

         if (envs[name]) {
            return this;
         } else {
            return empty;
         }

      } else {

         return empty;

      }

   }
};

consoln.use(base);

export default consoln;