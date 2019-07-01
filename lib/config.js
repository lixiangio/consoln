"use strict";

module.exports = {
   "log": {
      show(argv) {
         console.log(`\x1b[34m●\x1b[39m`, ...argv);
      }
   },
   "success": {
      show(argv) {
         console.log(`\x1b[32m√\x1b[39m`, ...argv);
      }
   },
   "info": {
      show(argv) {
         console.log(`\x1b[36mi\x1b[39m`, ...argv);
      }
   },
   "warn": {
      show(argv) {
         console.log(`\x1b[33m⚠\x1b[39m`, ...argv);
      }
   },
   "error": {
      show(argv) {
         console.log(`\x1b[31m✖\x1b[39m`, ...argv);
      }
   },
}