const createApp = require('./app')
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./step3/index.html', 'utf-8')
});
server.get('*', (req, res) => {
  const context = {
    title: 'hello ssr'
  };
  const app = createApp(req);
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html);
  })
})

server.listen(8080);