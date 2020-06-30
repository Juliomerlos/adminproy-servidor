const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//api/tareas
router.post('/',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('proyecto','El proyecto es obligatorio').not().isEmpty()
],
tareaController.crearTarea
)
//Obtener tareas por proyecto
router.get('/',
auth,
tareaController.obtenerTareas
);
//Actualizar estado de tareas
router.put('/:id',
auth,
tareaController.actualizarTarea
)
router.delete('/:id',
auth,
tareaController.eliminarTarea
)



module.exports = router;