const express = require("express");
const fs = require("fs");

const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/api", (req, res) => {
  res.json({
    requestedAt: req.requestTime,
    data: dataObj,
  });
});

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
app.post("/api/products", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    status: "success",
    data: req.body,
  });
});

app.listen(8000, () => {
  console.log("Express server running...");
});
