"use strict";

const config = require('./config.js');

const envArray = [];
const envString = process.env.consoln;

if (envString) {

   envString.split(',').forEach(item => {
      envArray.push(item.trim());
   })

}

const meta = {};
const empty = {};
function emptyFunc() { };

const consoln = {
   /**
    * 添加新的consoln方法或覆盖已有consoln方法
    */
   use(options = {}) {

      for (const name in options) {

         if (meta[name] === undefined) {
            meta[name] = {};
            empty[name] = emptyFunc;
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

            this[name] = emptyFunc;

         }

      }

   },
   /**
    * 隐藏log
    */
   hide() {

      for (const name in meta) {

         meta[name].show = emptyFunc;
         
      }

   },
   /**
    * 作用域
    * @param {String} name 作用域名称
    */
   scope(name) {

      if (envArray) {

         if (envArray.includes(name)) {
            return this;
         } else {
            return empty;
         }

      } else {

         return empty;

      }

   }
};

consoln.use(config);

module.exports = consoln;