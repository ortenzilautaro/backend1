import { Router } from 'express'
import CartManager from '../managers/cart.manager.js'

const router = Router()
const cartManager = new CartManager('./src/data/cart.json')

router.post('/', async(req, res)=>{
    try{
        const carritoNuevo = await cartManager.postCrearCarrito()
        return res.status(200).json(carritoNuevo)
    } catch{
        res.status(500).json({error:'no se pudo crear el carrito'})
    }
})
router.get('/:cid', async (req, res)=>{
    try{
        const {cid} = req.params
        const productosCarrito = await cartManager.getProductosCarrito(cid)
        res.status(200).json(productosCarrito)
    } catch{
        res.status(500).json({error: 'no se pudo mostrar el carrito'})
    }
})

router.post('/:cid/product/:pid', async (req,res)=>{
    try{
        const {cid, pid} = req.params
        const {quantity} = req.body
        const productoAgregado = await cartManager.postProductoAlCarrito(cid, pid, quantity)
        res.status(200).json(productoAgregado)
    } catch{
        res.status(500).json({error: 'no se pudo agregar el producto'})
    }

})

export default router