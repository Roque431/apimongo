const db = require("../models");
const ProductosNuevos = db.productos_nuevos;

// Crear un nuevo producto
exports.createProduct = (req, res) => {
    // Validar la solicitud
    if (!req.body.codigo || !req.body.nombre || !req.body.stock || !req.body.precioCompra || !req.body.precioVenta || !req.body.seccion) {
        return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    // Crear un nuevo producto
    const nuevoProducto = new ProductosNuevos({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        stock: req.body.stock,
        precioCompra: req.body.precioCompra,
        precioVenta: req.body.precioVenta,
        seccion: req.body.seccion
    });

    // Guardar el producto en la base de datos
    nuevoProducto.save((err, producto) => {
        if (err) {
            res.status(500).send({ message: "Error al crear el producto." });
            return;
        }
        res.send({ message: "Producto creado exitosamente.", producto });
    });
};

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    ProductosNuevos.find({}, (err, productos) => {
        if (err) {
            res.status(500).send({ message: "Error al obtener los productos." });
            return;
        }
        res.send(productos);
    });
};

// Obtener un producto por su ID
exports.getProductById = (req, res) => {
    ProductosNuevos.findById(req.params.id, (err, producto) => {
        if (err) {
            res.status(500).send({ message: "Error al obtener el producto." });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `Producto con ID ${req.params.id} no encontrado.` });
            return;
        }
        res.send(producto);
    });
};

// Actualizar un producto por su ID
exports.updateProductById = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos." });
    }

    ProductosNuevos.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }, (err, producto) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el producto." });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `No se pudo actualizar el producto con ID ${req.params.id}. Producto no encontrado.` });
            return;
        }
        res.send({ message: "Producto actualizado exitosamente." });
    });
};

// Eliminar un producto por su ID
exports.deleteProductById = (req, res) => {
    ProductosNuevos.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, producto) => {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el producto." });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `No se pudo eliminar el producto con ID ${req.params.id}. Producto no encontrado.` });
            return;
        }
        res.send({ message: "Producto eliminado exitosamente." });
    });
};

