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

  const newProduct = req.body;

  dataObj.push(newProduct);

  fs.writeFile("./data/data.json", JSON.stringify(dataObj), (err) => {
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  });
});

app.patch("/api/products/:id", (req, res) => {
  res.status(200).json({
    status: "succes",
    data: "<Update product here...>",
  });
});

app.delete("/api/products/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});
app.listen(8000, () => {
  console.log("Express server running...");
});
