const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/tareas', require('./routes/tareasRoutes'))

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))