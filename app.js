const http = require("http");
const fs = require("fs");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

// Read JSON File
const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.name, { lower: true }));

console.log(slugs);
// Read HTML templates
const tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");

const tempCard = fs.readFileSync("./templates/card.html", "utf-8");

const tempProduct = fs.readFileSync("./templates/product.html", "utf-8");

// Create Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  }

  // PRODUCT PAGE
  else if (pathname === "/product") {
    const product = dataObj[query.id];

    if (!product) {
      return res.end("Product not found");
    }

    const output = replaceTemplate(tempProduct, product);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(output);
  }

  // 404 PAGE
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });

    res.end("<h1>Page not found</h1>");
  }
});

// Start Server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
