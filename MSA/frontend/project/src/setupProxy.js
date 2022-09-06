const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api/device',
    createProxyMiddleware({
      target: 'item.msa-myuplus.in:8080',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/plan',
    createProxyMiddleware({
      target: 'item.msa-myuplus.in:8080',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/order',
    createProxyMiddleware({
      target: 'order.msa-myuplus.in:8081',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/search',
    createProxyMiddleware({
      target: 'search.msa-myuplus.in:8082',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/auto-completion',
    createProxyMiddleware({
      target: 'search.msa-myuplus.in:8082',
      changeOrigin: true,
    })
  )
}