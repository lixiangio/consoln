"use strict";

const debug = require('consoln').scope('debug');
const user = require('consoln').scope('user');

debug.log('hellow debug');

debug.success('hellow debug');

debug.warn({ a: 'debug' });

debug.error(new Error('test'));

debug.success('888');

user.log('hellow user');

user.success('hellow user');

user.warn({ a: "user" });