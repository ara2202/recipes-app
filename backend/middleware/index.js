const Logger = require('koa-logger');
const Cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');

const router = require('./../routes');
//const passport = require('./passport');


module.exports = (app) => {
  app.use(Helmet());

  if (process.env.NODE_ENV === 'development') {
    app.use(Logger());
  }

  app.use(Cors());
  app.use(require('koa-static')('./public'));
  app.use(bodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function (err, ctx) {
      ctx.throw('body parse error', 422)
    }
  }));
  
  app.use(respond());
  //app.use(passport.initialize());  //TODO HERE

  app.use(router.routes());
  app.use(router.allowedMethods());
  
};