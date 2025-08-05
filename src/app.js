const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Esto es un mensaje del servidor')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
