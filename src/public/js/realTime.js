const socket = io();

// Escucha cuando llega un producto nuevo
socket.on("actualizarProductos", (producto) => {
  const productList = document.getElementById("productList");
  const li = document.createElement("li");
  li.id = `prod-${producto.id}`;
  li.innerText = `${producto.title} - $${producto.price}`;
  productList.appendChild(li);
});

// Escucha cuando se elimina un producto
socket.on("productoEliminado", (id) => {
  const item = document.getElementById(`prod-${id}`);
  if (item) item.remove();
});

// Maneja envio de formulario de agregar producto
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;

  socket.emit("nuevoProducto", { id: Date.now(), title, price });
});

// Maneja envio de formulario de eliminar producto
document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("deleteId").value;
  socket.emit("eliminarProducto", id);
});
