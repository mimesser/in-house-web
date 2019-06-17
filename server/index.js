const Koa = require('koa');
const nextApp = require('next');
const Router = require('koa-router');
const auth = require('koa-basic-auth');

const port = parseInt(process.env.PORT || process.env.port, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dir: './src', dev });
const handle = app.getRequestHandler();

app.prepare()
   .then(() => {
      const server = new Koa();
      const router = new Router();

      // TODO: environment config + use this for staging only
      server.use(auth({ name: 'Radu', pass: 'Radu' }));

      router.get('/houses/:id', async ctx => {
         const { req, res, params } = ctx;
         await app.render(req, res, '/houses', { id: params.id });
         ctx.respond = false;
      });

      router.get(`/houses/:id/:tab`, async ctx => {
         const {
            req,
            res,
            params: { id, tab },
         } = ctx;
         await app.render(req, res, '/houses', { id, tab });
         ctx.respond = false;
      });

      for (const tab of ['mink', 'post']) {
         router.all(`/houses/:id/${tab}/new`, async ctx => {
            const {
               req,
               res,
               params: { id },
            } = ctx;

            ctx.redirect(`/houses/${id}/${tab}`);
            ctx.status = 301;
         });
      }

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
