const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (router) {
  // local dev
  router.use(
    createProxyMiddleware(
      [
        "/token-auth/**",
        "/api/**",
        "/token-verify/**",
        "/token-refresh/**",
        "/domains/**",
        "/ws/**",
        "/static/maps/**",
        "/static/meshes/**",
        "/static/point_clouds/**",
        "/lsp/**",
      ],
      {
        target: "https://localhost",
        ws: true,
        logLevel: "error",
        secure: false,
      }
    )
  );
  // using movai-flow dev
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
  //       "/lsp/**",
  //     ],
  //     {
  //       target: "http://localhost:8080",
  //       ws: true,
  //       logLevel: "error",
  //       secure: false,
  //     }
  //   )
  // );
};
