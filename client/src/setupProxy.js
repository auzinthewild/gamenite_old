const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(proxy(`/auth/**`, { target: "http://localhost:5000" }));
  app.use(proxy(`/games/**`, { target: "http://localhost:5000" }));
  app.use(proxy(`/players/**`, { target: "http://localhost:5000" }));
  app.use(proxy(`/groups/**`, { target: "http://localhost:5000" }));
  app.use(proxy(`/events/**`, { target: "http://localhost:5000" }));
};
