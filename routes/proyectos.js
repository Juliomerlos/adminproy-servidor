const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');//La importación conecta el middleware con la ruta de proyectos.

//crear proyectos: api/proyectos
router.post('/',
auth, //Como todo middleware, se ejecuta todo su código antes que siga a la otra línea. Aquí antes de verificar si el campo tiene texto, corre todo los de auth
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto
)
//obtener todos los proyectos
router.get('/',
auth,
proyectoController.obtenerProyectos
)
//modificar los proyectos via ID
router.put('/:id',
auth,
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto
)
//Eliminar un proyecto
router.delete('/:id',
auth,
proyectoController.eliminarProyecto
)

module.exports = router;

