import ProductManager from './controllers/productController.js';
const ProductManagers = new ProductManager()

export default (io) => {
    io.on("connection", (socket) => {
        console.log("nuevo socket connectado:", socket.id);

        const emitPrds = async () => {
            const data =  await ProductManagers.getProductsRealTime()
            socket.emit("server:loadproducts", data);
          };
          emitPrds();

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
};