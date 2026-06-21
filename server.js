const express = require("express");

const app = express();

const productRouter = require("./routes/productRoutes");

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

// Home Route
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

// Product Router
app.use("/api/products", productRouter);

app.listen(8000, () => {
  console.log("Express server running...");
});
