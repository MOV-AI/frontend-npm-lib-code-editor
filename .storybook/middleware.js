const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (router) {
  // router.use(
  //   createProxyMiddleware(
  //     [
  //       "/token-auth/**",
  //       "/api/**",
  //       "/token-verify/**",
  //       "/token-refresh/**",
  //       "/domains/**",
  //       "/ws/**",
  //       "/static/maps/**",
  //       "/static/meshes/**",
  //       "/static/point_clouds/**",
  //     ],
  //     {
  //       target: "https://localhost",
  //       ws: true,
  //       logLevel: "error",
  //       secure: false,
  //     }
  //   )
  // );
};
