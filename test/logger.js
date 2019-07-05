"use strict";

const consoln = require('consoln');
const logger = require('@consoln/logger');

consoln.show(false);

consoln.use(logger);

consoln.log('hellow');

consoln.success('hellow success');

consoln.warn({ a: 1 });

consoln.error({ 'error': true });

consoln.success('888');