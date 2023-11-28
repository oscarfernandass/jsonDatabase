const jsonServer = require("json-server");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const chokidar = require("chokidar");

const adapter = new FileSync("db.json");
const db = low(adapter);

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

// Use chokidar to watch for changes in db.json
const watcher = chokidar.watch("db.json");

watcher.on("change", () => {
  console.log("Reloading database...");
  // Reload the database when changes occur
  db.read();
  server.emit("hot-reload");
});

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
