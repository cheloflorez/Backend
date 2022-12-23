import fs, { promises } from 'fs'

class ProductManager {

    constructor() {
        this.path = './DBS/productos.json'
    }


    readFile = async () => {
        if (fs.existsSync(this.path)) {
            return promises.readFile(this.path, 'utf-8')
                .then(data => JSON.parse(data))
        }
        return []
    }

    write = list => {
        return promises.writeFile(this.path, JSON.stringify(list))
    }

    getNextID = (data) => {
        const count = data.length

        if (count > 0) {
            const lastEvent = data[count - 1]
            const id = lastEvent.id + 1

            return id
        } else {

            return 1
        }
    }

    addProduct = async (req, res) => {
        const prd = req.body
        const { title, description, price, thumbnail, code, stock, status, category } = prd
        if (title, description, price, code, stock, status, category) {
            const data = await this.readFile()
            const encontrado = data.find(prd => prd.code === code);
            if (encontrado) {
                req.flash("error_msg", "Producto existente");
                res.redirect("/api/products");
            }
            else {
                const id = this.getNextID(data)
                const producto = {
                    id,
                    title,
                    description,
                    price: parseInt(price),
                    thumbnail,
                    code,
                    stock: parseInt(stock),
                    status: true,
                    category
                }
                data.push(producto)
                await this.write(data)
                req.flash("success_msg", "Producto agregado correctamente");
                res.redirect("/api/products");
            }
        }
        else {
            req.flash("error_msg", "Ingrese todos los campos");
            res.redirect("/api/products");
        }
    }

    updateProduct = async (req, res) => {
        const id = req.params.pid
        const prd = req.body
        const { title, description, price, thumbnail, code, stock, status, category } = prd
        if (title, description, price, code, stock, status, category) {
            const data = await this.readFile()
            const index = data.findIndex((el) => el.id == id);
            if (index != -1) {
                data[index].title = title
                data[index].description = description
                data[index].price = price
                data[index].thumbnail = thumbnail
                data[index].code = code
                data[index].stock = stock
                data[index].status = status
                data[index].category = category
                await this.write(data)
                req.flash("success_msg", "Producto actualizado correctamente");
                res.redirect("/api/products");
            }
            else {
                req.flash("error_msg", "Producto no existe en la base de datos");
                res.redirect("/api/products");
            }
        } else {
            req.flash("error_msg", "Ingrese todos los campos");
            res.redirect("/api/products");
        }
    }

    getProductById = async (req, res) => {
        const id = req.params.pid
        const data = await this.readFile()
        const result = data.find(p => p.id == id)
        if (result == undefined) {
            res.send("Producto no encontrado")
        } else {
            res.send(data)
        }
    }

    getProducts = async (req, res) => {
        const query = req.query.limit
        const Pruductos = await this.readFile()
        if (query != undefined) {
            const nuevoArray = Pruductos.slice(0, query).map(item => item)
            res.render("productos/productos-limit", { nuevoArray })
        } else {
            res.render("productos/productos-admin", { Pruductos })
        }
    }

    getProductsRealTime = async () => {
        const Productos = await this.readFile()
        return Productos
    }

    deleteProduct = async (req, res) => {
        const id = req.params.pid
        const data = await this.readFile()
        const prddelete = data.findIndex(p => p.id == id)
        if (prddelete != -1) {
            data.splice(prddelete, 1)
            await this.write(data)
            req.flash("success_msg", "Producto Eliminado !");
            res.redirect("/api/products");
        }

        else {
            req.flash("error_msg", "Producto no existe en la base de datos");
            res.redirect("/api/products");
        }
    }
}

export default ProductManager