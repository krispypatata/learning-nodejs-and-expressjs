const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/product.controller");

// view the list of products
router.get("/", getProducts);
// get or view a specific product using its id
router.get("/:id", getProduct);
// create a product
router.post("/", createProduct);
// update a product
router.put("/:id", updateProduct);
// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;