import fs from "fs/promises";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async verificarArchivo() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await fs.writeFile(this.path, JSON.stringify([], null, 2));
        }
    }
    async getProductos() {
        await this.verificarArchivo();
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getProductosById(pid) {
        const productos = await this.getProductos();
        return productos.find((prod) => prod.pid === pid);
    }
    async postProductos({
        pid,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    }) {
        const productos = await this.getProductos();
        const producto = new Producto(
            pid,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        );
        productos.push(producto);
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
        return producto;
    }
    async putId(
        pid,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    ) {
        const productos = await this.getProductos();
        const index = productos.findIndex((prod) => prod.pid === pid);

        if (index !== -1) {
            productos[index] = {
                pid,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            };
            await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
            return productos[index];
        } else {
            console.log(`error`);
        }
    }

    async delete(pid) {
        const productos = await this.getProductos();
        const filtrados = productos.filter((prod) => prod.pid !== pid);
        await fs.writeFile(this.path, JSON.stringify(filtrados, null, 2));
    }
}

class Producto {
    constructor(
        pid,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    ) {
        this.pid = pid;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}
