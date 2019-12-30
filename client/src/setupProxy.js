const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/auth',
    proxy({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );
};