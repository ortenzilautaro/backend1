import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ProductManager from "./managers/product.manager.js";
import CartManager from "./managers/cart.manager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8080;

// ProductManager
const productManager = new ProductManager(join(__dirname, "data/products.json"));

// Configuración de handlebars
app.engine("handlebars", engine());
app.set("views", join(__dirname, "views"));
app.set("view engine", "handlebars");

// Carpeta public
app.use(express.static(join(__dirname, "public")));
app.use(express.json());

// Servidor HTTP
const httpServer = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Servidor WebSocket
const socketServer = new Server(httpServer);

// Guardamos Socket.io en la app para usarlo en routers
app.set("socketServer", socketServer);

// Rutas API
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);

// Rutas vistas
app.get("/", async (req, res) => {
  const productos = await productManager.getProductos();
  res.render("home", { productos });
});

app.get("/realtimeproducts", async (req, res) => {
  const productos = await productManager.getProductos();
  res.render("realTimeProducts", { productos });
});

// Escucha conexiones WebSocket
socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado!");

  // Envia productos actuales al conectarse
  const productos = await productManager.getProductos();
  socket.emit("actualizarProductos", productos);
});
