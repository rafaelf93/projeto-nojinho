const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("api/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Exemplo de rota customizada para atualizar status
server.put("/depositos", (req, res) => {
  const { status } = req.body;
  router.db.set("depositos", { status }).write();
  res.json({ status });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server rodando na porta 3000");
});