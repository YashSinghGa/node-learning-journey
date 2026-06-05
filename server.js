const express = require("express");
const fs = require("fs");

const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

// API Route
app.get("/api", (req, res) => {
  res.json(dataObj);
});

// Dynamic Product Route
app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = dataObj[id];

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.json(product);
});

app.listen(8000, () => {
  console.log("Express server running...");
});
