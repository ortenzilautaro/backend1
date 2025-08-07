import express from 'express'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()
const port = 8080

app.use(express.json())

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
