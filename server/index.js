const Koa = require('koa');
const nextApp = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT || process.env.port, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dir: './src', dev });
const handle = app.getRequestHandler();

app.prepare()
   .then(() => {
      const server = new Koa();
      const router = new Router();

      router.get('/houses/:id', ({ req, res, params }) => {
         return app.render(req, res, '/houses', { id: params.id });
      });

      router.get('*', async ctx => {
         await handle(ctx.req, ctx.res);
         ctx.respond = false;
      });

      server.use(async (ctx, next) => {
         ctx.res.statusCode = 200;
         await next();
      });

      server.use(router.routes());
      server.listen(port, err => {
         if (err) {
            throw err;
         }
         // eslint-disable-next-line no-console
         console.log(`> Ready on http://localhost:${port}`);
      });
   })
   .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
   });
