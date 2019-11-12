const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./step3/index.html', 'utf-8')
});
console.log(process.cwd());
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  const context = {
    title: 'hello ssr'
  };
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html);
  })
})

server.listen(8080);