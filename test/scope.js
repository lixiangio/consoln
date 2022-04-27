import consoln from 'consoln';

const demo = consoln.scope('demo');
const user = consoln.scope('user');

demo.log('hellow debug');

demo.success('hellow debug');

demo.warn({ a: 'debug' });

demo.error(new Error('test'));

demo.success('888');

user.log('hellow user');

user.success('hellow user');

user.warn({ a: "user" });
