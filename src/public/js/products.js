const socket = io();
let imput = document.getElementById('datahere')

socket.on("server:loadproducts", data => {
    imput.innerHTML = "";
    data.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML += `
        <div class="card">
        <div class="card-body">
        <p> ID: ${product.id} </p>
        <p> Producto : ${product.title} </p>
        <p> Descipcion : ${product.description} </p>
        <p> Codigo : ${product.code} </p>
        <p> Stock :${product.stock} </p>
        <p> Categoria : ${product.category} </p>
        <p> Precio : ${product.price} </p>
        </div>
        </div>
                           `;
        imput.appendChild(div);
    });
});