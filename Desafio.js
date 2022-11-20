class ProductManager {

    constructor() {
        this.products = []
    }

    getProducts = () => { console.log(this.products) }
    getProductById = (id) => {
        const encontrado = this.products.find(prd => prd.id === id);
        encontrado ? console.log(encontrado) : console.log("Producto no encontrado")
    }


    getNextID = () => {
        const count = this.products.length

        if (count > 0) {
            const lastEvent = this.products[count - 1]
            const id = lastEvent.id + 1

            return id
        } else {

            return 1
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (title, description, price, thumbnail, code, stock) {
            const encontrado = this.products.find(prd => prd.code === code);
            if (encontrado) console.log("Producto ya existe")
            else {
                const id = this.getNextID()
                const producto = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(producto)
            }
        }
        else console.log("Ingrese todos los campos")
    }
}



const ProductManagers = new ProductManager()

ProductManagers.addProduct("Heladera", "Heladera Gaffa", 120, "Imagen", "CX100", 150)
ProductManagers.addProduct("Microondas", "Microondas Gaffa", 100, "Imagen", "MX200", 100)
ProductManagers.addProduct("Cocina", "Cocina Gaffa", 150, "Imagen", "PX500", 50)
ProductManagers.addProduct("Heladera", "Heladera Gaffa", 120, "Imagen", "CX100", 150) // RETORNA PRODUCTO YA EXISTE
ProductManagers.addProduct("Microondas Gaffa", "Imagen", "TR200", 100) // RETORNA INGRESE TODOS LOS CAMPOS
ProductManagers.getProductById(1) // RETORNA SOLAMENTE EL PRODUCTO CON ID 1
ProductManagers.getProducts() // RETORNA TODOS LOS PRODUCTOS
