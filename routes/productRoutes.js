const express = require("express");

const mongoController = require("../controllers/NoSQLcontroller");
const sqlController = require("../controllers/SQLcontroller");

const router = express.Router();

// MongoDB routes
router.post("/mongodb/products", mongoController.createProduct);
router.get("/mongodb/products", mongoController.getAllProducts);
router.get("/mongodb/products/:id", mongoController.getProductById);
router.put("/mongodb/products/:id", mongoController.updateProduct);
router.delete("/mongodb/products/:id", mongoController.deleteProduct);

// MariaDB / SQL routes
router.post("/mysql/products", sqlController.createProduct);
router.get("/mysql/products", sqlController.getAllProducts);
router.get("/mysql/products/:id", sqlController.getProductById);
router.put("/mysql/products/:id", sqlController.updateProduct);
router.delete("/mysql/products/:id", sqlController.deleteProduct);

module.exports = router;
