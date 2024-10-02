const express = require("express");
const {
  writeFile
} = require("fs/promises");
const {
  join
} = require("path");
const productDBS = require("./products-data.json");

const app = express();
const host = "127.0.0.1";
const port = 8001;

app.use(express.static(join(__dirname, "./public")));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/product-get-all-products", (request, response) => {
  response.status(200).json(productDBS);
});

app.get("/", (request, response) => {
  response.status(200).sendFile(join(__dirname, "./views/index.html"));
});

app.get("/product/get-product/:id", (request, response) => {
  const productsID = productDBS.map((product) => product.id);

  const {
    id
  } = request.params;

  if (!productsID.includes(Number(id))) {
    return response.status(404).json({
      status: "fail",
      error: {
        message: `we didn't find any product by id:${id}`,
      },
    });
  }

  const selectedProduct = productDBS.find(
    (product) => product.id === Number(id)
  );
  response.status(200).json({
    status: "ok",
    data: {
      selectedProduct,
    },
  });
});

app.post("/product/create-product", (request, response) => {
  let getProduct = request.body.data;
  const newProduct = {};

  for (const property of getProduct) {
    newProduct[property.id] = property.value;
  }
  const isProductExistINDB = productDBS.find(
    (product) => product.id === newProduct.id
  );
  if (isProductExistINDB) {
    return response.json({
      status: "fail",
      error: {
        message: `id${newProduct.id} is exist in dbs`,
      },
    });
  }

  productDBS.push(JSON.parse(newProduct));
  writeFile(
    join(__dirname, "./products-data.json"),
    json.stringify(productDBS)
  );
});

app.put("/product/update-product/:id", async (request, response) => {
  try {
    const {
      id
    } = request.params;
    const updatedProduct = request.body.data;

    const newInfo = {};
    for (const property of updatedProduct) {
      newInfo[property.id] = property.value;
    }
    console.log(newInfo);

    const indexOfProduct = productDBS.findIndex(
      (product) => product.id === Number(id)
    );
    if (indexOfProduct === -1) {
      return response.status(404).json({
        status: "fail",
        error: {
          message: `id${id} is not exist in dbs`,
        },
      });
    }
    productDBS.splice(indexOfProduct, 1, newInfo);
    await writeFile(
      join(__dirname, "./products-data.json"),
      JSON.stringify(productDBS)
    );

    response.status(200).json({
      status: "ok",
      data: {
        newInfo,
      },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      error: {
        message: `server error`,
      },
    });
  }
});

app.delete("/product/remove-product/id", (request, response) => {
  const {
    id
  } = request.params;
  const deletedProduct = request.body;
  const indexOfProduct = productDBS.indexOf(
    (product) => product.id === Number(id)
  );
  if (!indexOfProduct) {
    return response.status(404).json({
      status: "fail",
      error: {
        message: `id${newProduct.id} isn not exist in dbs`,
      },
    });
  }
  productDBS.toSpliced(indexOfProduct, 1);
  writeFile(
    join(__dirname, "./products-data.json"),
    JSON.stringify(productDBS)
  );

  response.status(200).json({
    status: "ok",
    data: {
      deletedProduct,
    },
  });
});

app.all("*", (request, response) => {
  response.status(404).json({
    status: "fail",
    error: {
      message: `not-found`,
    },
  });
});
app.listen(port, host, () => {
  `you are listening on ${host}:${port}`;
});