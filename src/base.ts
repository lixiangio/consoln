export default {
   "log": {
      show(argv: any[]) {
         console.log("\x1b[39m▪", ...argv);
      }
   },
   "success": {
      show(argv: any[]) {
         console.log("\x1b[32m√\x1b[39m", ...argv);
      }
   },
   "info": {
      show(argv: any[]) {
         console.log("\x1b[36mi\x1b[39m", ...argv);
      }
   },
   "warn": {
      show(argv: any[]) {
         console.log("\x1b[33m⚠\x1b[39m", ...argv);
      }
   },
   "error": {
      show(argv: any[]) {
         console.log("\x1b[31m✖\x1b[39m", ...argv);
      }
   },
}