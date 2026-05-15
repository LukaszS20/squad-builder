// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/football',
    createProxyMiddleware({
      target: 'https://api.football-data.org/v4',
      changeOrigin: true,
      headers: {
        'X-Auth-Token': 'e38b7d23459d4a46917af9c82bebfc68' // 🔑 WKLEJ SWÓJ KLUCZ
      },
      pathRewrite: {
        '^/api/football': '',
      },
    })
  );
};