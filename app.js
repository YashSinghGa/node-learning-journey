const http = require("http");
const fs = require("fs");
const url = require("url");

// Read JSON File
const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

// Read HTML template
const tempProduct = fs.readFileSync("./templates/product.html", "utf-8");

// Create Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Routing
  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the OVERVIEW page");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  } else if (pathname === "/product") {
    const product = dataObj[query.id];

    let output = tempProduct.replace("{%PRODUCTNAME%}", product.name);

    output = output.replace("{%PRICE%}", product.price);

    output = output.replace("{%DESCRIPTION%}", product.description);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(output);
  } else {
    res.writeHead(404);

    res.end("Page not Found");
  }
});

// Start Server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
