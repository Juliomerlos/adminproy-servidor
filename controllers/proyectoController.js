const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

const { validationResult } = require('express-validator');

//creación del proyecto
exports.crearProyecto = async (req, res) => {

    const errores = validationResult(req)
    console.log(errores)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;//Aquí se guarda el creador vía JWT
        proyecto.save();//Una vez guardado el id se guarda el proyecto.

        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 })
        res.json({ proyectos })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
    const errores = validationResult(req)
    console.log(errores)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //Extraer la información del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }
    try {
        //revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);
        //revisar si el proyecto existe o no 
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //verificar el creador del proyecto

        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        //actualizar
        proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

        res.json({ proyecto })

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor');
    }
}


//Elimina un proyecto por su ID

exports.eliminarProyecto = async (req, res) => {
    try {
        let proyecto = await Proyecto.findById(req.params.id);
        //revisar si el proyecto existe o no 
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //verificar el creador del proyecto

        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Eliminar el proyecto
        await Tarea.deleteMany({ proyecto: req.params.id });
        await Proyecto.findOneAndRemove({_id:req.params.id});
        res.json({msg: 'Proyecto eliminado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}