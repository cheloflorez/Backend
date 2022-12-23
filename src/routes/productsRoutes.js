import { Router } from "express";
const router = Router()

import ProductManager from '../controllers/productController.js';
const ProductManagers = new ProductManager()


router.get("/", ProductManagers.getProducts);

router.get("/realtimeproducts", (req, res) => {
    res.render('productos/realTimeProducts',)
})
router.get("/:pid", ProductManagers.getProductById)

router.post("/", ProductManagers.addProduct)

router.put("/:pid", ProductManagers.updateProduct)

router.delete("/:pid", ProductManagers.deleteProduct)

export default router