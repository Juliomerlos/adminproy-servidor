const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');//Desde el  archivo usuarioController se exportan las funciones.
const {check} = require('express-validator');

//Crea un usuario
//Su endpoint es api/usuarios
// '/' inmediatamente manda a '/api/usuarios'
router.post('/', 
[
    check('email','Agrega un email válido').isEmail()
]
,usuarioController.crearUsuario)//Como no se trata de un export default, se especifica la función que deseamos.

module.exports = router;