if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // hanya pada development atau test
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const Controller = require("./controller/controller");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/product", Controller.getProduct);
app.get("/product/detail/:id", Controller.getProductById);
app.post("/product", Controller.addProdcut);
app.put("/product/:id", Controller.updateProduct);
app.delete("/product/:id", Controller.deleteProduct);
app.get("/product/compare/", Controller.compareProduct);

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

app.use(errorHandler);
module.exports = app;
