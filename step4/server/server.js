const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});

// 后端Server
backendRouter.get('*', async (ctx, next) => {

    // 这里用 renderToString 的 promise 返回的 html 有问题，没有样式
    await renderer.renderToString(ctx).then((html) => {
          // console.log(html);
          ctx.status = 200;
          ctx.body = html;
    }).catch((err)=>{
      ctx.status = 500;
      ctx.body = err;
    });
  });
  
  backendApp.use(serve(path.resolve(__dirname, '../dist')));
  backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

  backendApp.listen(3009, () => {
    console.log('服务器端渲染地址： http://localhost:3009');
  });

  // 前端Server
frontendRouter.get('/index', (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
  });
  
  frontendApp.use(serve(path.resolve(__dirname, '../dist')));
  
  frontendApp
    .use(frontendRouter.routes())
    .use(frontendRouter.allowedMethods());
  
  frontendApp.listen(3001, () => {
    console.log('浏览器端渲染地址： http://localhost:3001');
  });