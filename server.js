const express = require("express");
const fs = require("fs");

const data = fs.readFileSync("./data/data.json", "utf-8");

const dataObj = JSON.parse(data);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/api", (req, res) => {
  res.json(dataObj);
});

app.listen(8000, () => {
  console.log("Express server running...");
});
