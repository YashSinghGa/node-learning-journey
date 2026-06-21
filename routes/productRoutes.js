const express = require("express");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("Get all products");
  })
  .post((req, res) => {
    res.send("Create product");
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send("Get one product");
  })
  .patch((req, res) => {
    res.send("Update product");
  })
  .delete((req, res) => {
    res.send("Delete product");
  });

module.exports = router;
