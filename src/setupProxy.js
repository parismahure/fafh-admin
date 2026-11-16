// Local dev only: forward API calls to the backend running on port 5050.
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_ROUTES = ["/getUserStats", "/getMealStats", "/getWaterStats", "/getAllUsers", "/getUser", "/downloadUsers", "/downloadMeals"];

module.exports = function (app) {
  app.use(API_ROUTES, createProxyMiddleware({ target: "http://localhost:5050", changeOrigin: true }));
};
