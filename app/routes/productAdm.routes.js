const controller = require("../controllers/productAdmin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "http://127.0.0.1:5500"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
  });

  // Ruta para crear un nuevo producto
  app.post(
    "/api/products",
    controller.createProduct
  );

  // Ruta para obtener todos los productos
  app.get(
    "/api/products",
    controller.getAllProducts
  );

  // Ruta para obtener un producto por su ID
  app.get(
    "/api/products/:id",
    controller.getProductById
  );

  // Ruta para actualizar un producto por su ID
  app.put(
    "/api/products/:id",
    controller.updateProductById
  );

  // Ruta para eliminar un producto por su ID
  app.delete(
    "/api/products/:id",
    controller.deleteProductById
  );
};

