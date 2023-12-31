const fastify = require("fastify");
const app = fastify();
app.register(require("fastify-ws"));
const WsController = require("./controller/WebConsole");

app.ready(err => {
  if (err) throw err;
  console.log("server started...");
  app.ws.on("connection", WsController);
});

app.get("/", (req, res) => {
  res.send({ webConsole: "Hello world !" });
});

app.listen(3001);