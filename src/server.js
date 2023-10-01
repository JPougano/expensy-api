const Koa = require("koa");

const { PORT } = process.env;

const app = new Koa();
const APP_PORT = PORT || 3000;

app.use(async (ctx) => {
  ctx.body = `Server is running on port ${APP_PORT}`;
});

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
