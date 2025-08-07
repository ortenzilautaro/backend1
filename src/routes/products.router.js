import { Router } from 'express'
import ProductManager from '../managers/product.manager.js'

const router = Router()
const productManager = new ProductManager('./src/data/products.json')

router.get('/', async(req, res)=>{
    try{
        const productos = await productManager.getProductos()
        res.status(200).json(productos)
    }
    catch{
        res.status(500).json({error:'error al obtener productos'})
    }
})

router.get('/:pid', async(req, res)=>{
    try{
        const {pid} = req.params
        const productoById = await productManager.getProductosById(parseInt(pid))
        res.status(200).json(productoById)
    }
    catch{
        res.status(500).json({error: 'error al obtener el producto indicado'})
    }
})

router.post('/', async (req,res)=>{
    try{
        const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            } = req.body;
        const nuevoProducto = await productManager.postProductos({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails})
        res.status(201).json(nuevoProducto)
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.put('/:pid', async (req, res)=>{
    try{
        const {pid} = req.params
        const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            } = req.body;
        const productoActualizado = await productManager.putId(pid,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails)
        res.status(200).json(productoActualizado)
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.delete('/:pid', async (req, res)=>{
    try{
        const {pid} = req.params
        const productoEliminado = await productManager.delete(pid)
        res.status(200).json(productoEliminado)
    }
    catch{
        res.status(500).json({error: 'error al eliminar el producto'})
    }
})

export default router