const express = require('express')
const aplicacion = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const routes = require('./routes/routes');

aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))
aplicacion.use(express.static('public'))
aplicacion.use(fileUpload())

aplicacion.use(routes)

aplicacion.listen(8080, () => {
  console.log("Servidor iniciado")
})
