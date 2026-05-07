const http = require("http");
const fs = require("fs");
const url = require("url");

//Read JSON File
const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

// Read HTML template
const tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
// const tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
const tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
const tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// Create Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Routing
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = dataObj
      .map((el) => {
        let card = tempCard.replace("{%PRODUCTNAME%}", el.name);

        card = card.replace("{%PRICE%}", el.price);

        card = card.replace("{%ID%}", el.id);

        return card;
      })
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  } else if (pathname === "/product") {
    const product = dataObj[query.id];

    if (!product) {
      return res.end("Product not found");
    }

    let output = tempProduct.replace("{%PRODUCTNAME%}", product.name);

    output = output.replace("{%PRICE%}", product.price);

    output = output.replace("{%DESCRIPTION%}", product.description);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(output);
  }
  // res.end(output);
});

// Start Server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
