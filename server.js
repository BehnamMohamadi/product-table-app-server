const express = require("express");
const productDBS = require("./products-data.json");

const app = express();
const host = "127.0.0.1";
const port = 8000;

app.get("/product-get-all-products", (request, response) => {
  response.status(200).json(productDBS)
})

app.get("/product/get-product/:id", (request, response) => {
  const productsID = productDBS.map(product => product.id)

  const {
    id
  } = request.params

  if (!productsID.includes(Number(id))) {
    return response.status(404).json({
      status: "fail",
      error: {
        message: `we didn't find any product by id:${id}`
      }
    })
  }

  const selectedProduct = productDBS.find(product => product.id === Number(id))
  response.status(200).json({
    status: "ok",
    data: {
      selectedProduct
    }
  })
})

app.listen(port, host, () => {
  `you are listening on ${host}:${port}`;
});