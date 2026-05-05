const http = require("http");
const fs = require("fs");

// Read File
const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

//create server
const server = http.createServer((req, res) => {
  res.end(data);
});

// start server

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
