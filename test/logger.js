import consoln from 'consoln';
import logger from 'consoln/logger';

// consoln.show(false);

consoln.use(logger({ "interval": 5000 }));

consoln.log('hellow');

consoln.success('hellow success');

consoln.warn({ a: 1 });

consoln.error({ 'error': true });

consoln.success('888');
