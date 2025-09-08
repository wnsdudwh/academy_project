const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app)
{
  app.use(
    '/api', // '/api'로 시작하는 모든 요청을
    createProxyMiddleware({
      target: 'http://192.168.25.60:9090', // 백엔드 서버로 보낸다
      changeOrigin: true,
    })
  );
};