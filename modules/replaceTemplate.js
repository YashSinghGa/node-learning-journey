module.exports = (temp, product) => {
  let output = temp.replace("{%PRODUCTNAME%}", product.name);

  output = output.replace("{%PRICE%}", product.price);

  output = output.replace("{%DESCRIPTION%}", product.description);

  output = output.replace("{%ID%}", product.id);

  return output;
};
