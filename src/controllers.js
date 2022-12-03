const fs = require('fs')

class ProductManager {

    constructor() {
        this.path = 'productos.json'
        this.data = []
    }

    Init = async () => {
        try {
            const data = await this.readFile()
            if (data.length > 0) {
                this.data = data
                console.log('Data loaded from file')
            }
        } catch (e) {
            console.log('No se encontro el file')
            console.log('Creando uno nuevo')
            this.write()
        }
    }

    readFile = async () => {
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => JSON.parse(data))
    }

    write = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.data))
            .then(() => {
                console.log('Data saved!')
            })
            .catch(e => console.log(e))
    }

    getNextID = () => {
        const count = this.data.length

        if (count > 0) {
            const lastEvent = this.data[count - 1]
            const id = lastEvent.id + 1

            return id
        } else {

            return 1
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (title, description, price, thumbnail, code, stock) {
            const encontrado = this.data.find(prd => prd.code === code);
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
                this.data.push(producto)
                await this.write()
            }
        }
        else console.log("Ingrese todos los campos")
    }

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        let index = this.data.findIndex((el) => el.id == id);
        this.data[index].title = title
        this.data[index].description = description
        this.data[index].price = price
        this.data[index].thumbnail = thumbnail
        this.data[index].code = code
        this.data[index].stock = stock
        await this.write()
    }

    getProductById(id) {
        const result = this.data.find(p => p.id == id)
        return result
    }

    getProducts = () => {
        return this.data
    }

    deleteProduct = async (id) => {
        const prddelete = this.data.findIndex(p => p.id == id)
        this.data.splice(prddelete, 1)

       await this.write()
    }
}


module.exports = ProductManager