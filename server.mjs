import { createServer } from "node:http";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const version = process.env.APP_VERSION || "local";
const startedAt = new Date().toISOString();

const server = createServer((request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ status: "ok", service: "mini-paas-demo-app", version }));
    return;
  }
  if (request.url === "/version") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ name: "Mini PaaS Demo App", version, startedAt }));
    return;
  }
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(`<!doctype html>
<html lang="vi">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mini PaaS Demo App</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;color:#172033;background:#f4f6fa}
    main{max-width:620px;padding:40px;border:1px solid #e4e8f0;border-radius:14px;background:#fff;box-shadow:0 8px 30px #2430490f}
    small{color:#2864dc;font-weight:700;letter-spacing:.08em}h1{margin:10px 0 12px}p{color:#647089;line-height:1.7}code{padding:3px 6px;border-radius:5px;background:#eef1f5}
  </style>
  <main><small>MINI PAAS · WEB SERVICE</small><h1>Ứng dụng độc lập đã hoạt động</h1><p>Container đang chạy phiên bản <code>${version}</code>. Kiểm tra thêm tại <a href="/health">/health</a> và <a href="/version">/version</a>.</p></main>
</html>`);
    return;
  }
  response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({ error: "not_found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.info(JSON.stringify({ event: "server_started", port, version }));
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
