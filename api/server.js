const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("api/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.put("/depositos", (req, res) => {
  const { status } = req.body;
  router.db.set("depositos", { status }).write();
  res.json({ status });
});

server.use(router);

module.exports = server; // 🔹 ESSENCIAL para Vercel
