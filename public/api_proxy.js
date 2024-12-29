const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use(
  "/api_proxy",
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathRewrite: { "^/api_proxy": "" },
  }),
);

module.exports = app;
