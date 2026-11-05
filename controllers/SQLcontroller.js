const db = require("../config/mysql");

// POST /api/mysql/products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock = true } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      price === undefined ||
      !Number.isFinite(Number(price))
    ) {
      return res.status(400).json({
        message: "Name and a valid price are required",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)",
      [name.trim(), Number(price), category || null, inStock],
    );

    res.status(201).json({
      message: "Product created successfully",
      product: {
        id: result.insertId,
        name: name.trim(),
        price: Number(price),
        category: category || null,
        inStock,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/mysql/products
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.execute("SELECT * FROM products");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/mysql/products/:id
exports.getProductById = async (req, res) => {
  try {
    const [products] = await db.execute("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/mysql/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      price === undefined ||
      !Number.isFinite(Number(price))
    ) {
      return res.status(400).json({
        message: "Name and a valid price are required",
      });
    }

    // Check ifthe product exists first
    const [existingProducts] = await db.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
    );

    if (existingProducts.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.execute(
      `UPDATE products
             SET name = ?, price = ?, category = ?, inStock = ?
             WHERE id = ?`,
      [
        name.trim(),
        Number(price),
        category || null,
        inStock ?? true,
        req.params.id,
      ],
    );

    const [updatedProducts] = await db.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProducts[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/mysql/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
