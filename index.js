const jsonServer = require("json-server");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

// Use the watch function to enable real-time updates
const watchOptions = {
  watch: true,
  noCors: false, // Enable CORS, adjust as needed
};

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  jsonServer.watch("db.json", watchOptions); // Enable watching for changes
});
