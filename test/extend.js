"use strict";

const consoln = require('consoln');
const save = require('@consoln/save');

consoln.hide();

consoln.use(save);

consoln.log('hellow');

consoln.success('hellow success');

consoln.warn({ a: 1 });

consoln.error({ 'error': true });

consoln.success('888');