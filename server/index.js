const Koa = require('koa');
const nextApp = require('next');
const Router = require('@koa/router');

const slow = require('koa-slow');

const port = process.env.PORT || 3000;
const app = nextApp({ dir: './src', dev: process.env.NODE_ENV === 'locale' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(
      slow({
        url: /\.[jpg|jpeg|mp4|png]$/i,
        delay: 500,
      }),
    );
    server.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        err.status = err.statusCode || err.status || 500;
        throw err;
      }
    });

    for (const venue of ['houses', 'polls']) {
      router.get(`/${venue}/:id`, async (ctx) => {
        const { req, res, params } = ctx;
        await app.render(req, res, `/${venue}`, { id: params.id });
        ctx.respond = false;
      });
    }

    for (const venue of ['houses', 'polls']) {
      router.get(`/${venue}/:id/:tab`, async (ctx) => {
        const {
          req,
          res,
          params: { id, tab },
        } = ctx;
        await app.render(req, res, `/${venue}`, { id, tab });
        ctx.respond = false;
      });
    }
    for (const venue of ['houses', 'polls']) {
      router.get(`/${venue}/:id/:tab/:itemId`, async (ctx) => {
        const {
          req,
          res,
          query: { token },
          params: { id, tab, itemId },
        } = ctx;
        await app.render(req, res, `/${venue}`, { id, tab, itemId, token });
        ctx.respond = false;
      });
    }

    for (const venue of ['houses', 'polls']) {
      const tabs = venue === 'houses' ? ['mink', 'post'] : ['post'];
      for (const tab of tabs) {
        router.all(`/${venue}/:id/${tab}/new`, async (ctx) => {
          const {
            req,
            res,
            params: { id },
          } = ctx;

          ctx.redirect(`/${venue}/${id}/${tab}`);
          ctx.status = 301;
        });
      }
    }

    router.get('(.*)', async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      // Koa doesn't seems to set the default statusCode.
      // So, this middleware does that
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes()).use(router.allowedMethods());
    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
