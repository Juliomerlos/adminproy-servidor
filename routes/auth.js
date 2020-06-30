//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
//Iniciar sesión
//api/auth
router.post('/', 
//[Como se va a iniciar sesión ya no es necesario incluir el nombre del usuario
    /* check('email','Agrega un email válido').isEmail(),
    check('password','El password debe ser mínimo de 6 caracteres').isLength({min:6})
], */
authController.autenticarUsuario
)


//Obtener el usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
)

module.exports = router;