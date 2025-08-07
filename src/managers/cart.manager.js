import fs from 'fs/promises';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async verificarArchivo() {
        try {
            await fs.access(this.path);
        } catch {
            await fs.writeFile(this.path, JSON.stringify([], null, 2));
        }
    }

    async postCrearCarrito() {
        await this.verificarArchivo();
        const data = await fs.readFile(this.path, 'utf-8');
        const carritoJSON = JSON.parse(data);

        const cid = carritoJSON.length > 0
            ? carritoJSON[carritoJSON.length - 1].cid + 1
            : 1;

        const nuevoCarrito = new Carrito(cid, []);
        carritoJSON.push(nuevoCarrito);

        await fs.writeFile(this.path, JSON.stringify(carritoJSON, null, 2));
        return nuevoCarrito;
    }

    async getProductosCarrito(cid) {
        await this.verificarArchivo();
        const data = await fs.readFile(this.path, 'utf-8');
        const carritos = JSON.parse(data);
        const carritoById = carritos.find(x => x.cid === parseInt(cid));
        if (!carritoById) return null;
        return carritoById.prod;
    }

    async postProductoAlCarrito(cid, pid, quantity) {
        await this.verificarArchivo();
        const data = await fs.readFile(this.path, 'utf-8');
        const carritos = JSON.parse(data);
        const index = carritos.findIndex(x => x.cid === parseInt(cid));

        if (index === -1) return null;

        carritos[index].prod.push({ product: pid, quantity: quantity});

        await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
        return carritos[index];
    }
}

class Carrito {
    constructor(cid, prod = []) {
        this.cid = cid;
        this.prod = prod;
    }
}