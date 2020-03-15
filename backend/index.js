require("dotenv").config();
const config = require("config");

const Koa = require("koa");
const mongoose = require("mongoose");
const applyMiddlewares = require("./middleware");
const fs = require("fs");
const path = require("path");

const app = new Koa();
applyMiddlewares(app);

// вынести в мидлвары
/*
const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));

  app.use(async (ctx, next) => {
  if (!ctx.url.startsWith('/api')) {
    ctx.set('content-type', 'text/html');
    ctx.body = index;
  }
});
*/
//mongoose.connect(config.get('mongodb.uri'), { useNewUrlParser: true, useUnifiedTopology: true});

const port = config.get("app.port");
app.listen(port, () => console.log(`API server started on ${port}`));
