const express = require("express");
const router = express.Router()

const ProductManager = require('../controllers')
const ProductManagers = new ProductManager()

const Inicializando = ProductManagers.Init()

router.get("/", (req, res) => {
    res.send("Bienvenidos")
});

router.get("/products",  (req, res) => {
    const query = req.query.limit
    const data =  ProductManagers.getProducts()
    if (query != undefined) {
        const nuevoArray = data.slice(0, query).map(item => item)
        res.send(nuevoArray)
    } else {
        res.send(data)
    }

});

router.get("/products/:pid", (req, res) => {
    const id = req.params.pid
    const data = ProductManagers.getProductById(id)
    if (data == undefined) {
        res.send("Producto no encontrado")
    } else {
        res.send(data)
    }

});


module.exports = router