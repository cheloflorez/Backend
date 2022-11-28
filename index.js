const ProductManager = require('./controllers.js')

const ProductManagers = new ProductManager()

Test = async () => {
    await ProductManagers.Init()
    ProductManagers.getProducts()
    await ProductManagers.deleteProduct(1)
    // await ProductManagers.addProduct("Heladera", "Heladera Gaffa", 120, "Imagen", "CX100", 150)
    // await ProductManagers.addProduct("Heladera", "Heladera Gaffa", 120, "Imagen", "CX100", 150)
    // await ProductManagers.addProduct("Microondas", "Microondas Gaffa", 100, "Imagen", "MX200", 100)
    // await ProductManagers.addProduct("Cocina", "Cocina Gaffa", 150, "Imagen", "PX500", 50)
    // await ProductManagers.addProduct("Heladera", "Heladera Gaffa", 120, "Imagen", "CX100", 150) // RETORNA PRODUCTO YA EXISTE
    // await ProductManagers.addProduct("Microondas Gaffa", "Imagen", "TR200", 100) // RETORNA INGRESE TODOS LOS CAMPOS
    ProductManagers.getProducts()
    // ProductManagers.getProductById(2)
}

Test()