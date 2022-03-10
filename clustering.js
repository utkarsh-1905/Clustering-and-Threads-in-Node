const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

console.log("CPUs: " + numCPUs);

//To check if the current instance of the server is the master or not
if (cluster.isMaster) {
  //Fork workers to create multiple instance of this server to handle requests
  //This is used for load balancing on the server
  console.log("Master process started");
  console.log("Forking workers");
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const app = express();
  const crypto = require("crypto");
  //slow path
  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("hash done");
    });
  });

  //fast path
  app.get("/fast", (req, res) => {
    res.send("i am fast");
  });

  app.listen(3000);
}
