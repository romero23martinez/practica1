const apiUrl = 'https://crudcrud.com/api/41cff483e08d4191af4d9f23b2308142/products';

document.getElementById("formularioCrear").addEventListener("submit", async function createProduct(event) {
    event.preventDefault();
    const nombre = document.querySelector("#formularioCrear .nombre").value; 
    const cantidad = document.querySelector("#formularioCrear .cantidad").value;

    const producto = { nombre, cantidad };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
    console.log(producto);

    document.querySelector("#formularioCrear .nombre").value = "";
    document.querySelector("#formularioCrear .cantidad").value = "";
    getProducts();
    return response.json();
});

async function getProducts() {
    const response = await fetch(apiUrl);
    const datos = await response.json();

    document.getElementById("body").innerHTML = "";

    datos.forEach(celda => {
        document.getElementById("body").innerHTML +=`
        <tr>
            <td>${celda._id}</td>
            <td>${celda.nombre}</td>
            <td>${celda.cantidad}</td>
            <td>
                <button onclick="deleteProduct('${celda._id}')">Eliminar</button>
                <button onclick="updateProduct('${celda._id}')">Modificar</button>
            </td>
        </tr>
        `;
    });
}

document.getElementById("formularioModificar").addEventListener("submit", async function updateProduct(productId, product) {
    const response = await fetch(`${apiUrl}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return response.json();
});

document.getElementById("formularioEliminar").addEventListener("submit", async function deleteProduct(productId) {
    await fetch(`${apiUrl}/${productId}`, {
        method: 'DELETE'
    });
    getProducts();
});
getProducts();