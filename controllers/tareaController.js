const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');


//Crea una nueva tarea
exports.crearTarea = async (req, res) => {
    const errores = validationResult(req)
    console.log(errores)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //Extraer el proyecto para ver si existe
    const {proyecto} = req.body;

    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) { 
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {//una vez que ya se comprobó que el proyecto existe a la base de datos se comprueba si pertenece al usuario.
            return res.status(401).json({ msg: 'No autorizado' });
        }
        //Creación de la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
      
        res.json({tarea});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}

//Mostrar las tarea por proyecto
exports.obtenerTareas = async (req,res) => {
//Se extrae el proyecto
const {proyecto} = req.query;

    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) { 
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {//una vez que ya se comprobó que el proyecto existe a la base de datos se comprueba si pertenece al usuario.
            return res.status(401).json({ msg: 'No autorizado' });
        }
        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto: proyecto})
        res.json({tareas})


    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        }
}



exports.actualizarTarea =async (req,res)=> {
    //Se extrae el proyecto
    const {proyecto, nombre, estado} = req.body;

try {
   //Verficar si la tarea existe
let tarea = await Tarea.findById(req.params.id);
    if(!tarea) { 
        return res.status(404).json({msg:'Tarea no encontrada'})
    }
    const existeProyecto = await Proyecto.findById(proyecto);
    //Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {//una vez que ya se comprobó que el proyecto existe a la base de datos se comprueba si pertenece al usuario.
        return res.status(401).json({ msg: 'No autorizado' });
    }
    
    nuevaTarea = {}

   /*  if(nombre) */  nuevaTarea.nombre =nombre;
    /*i f(estado) */  nuevaTarea.estado = estado;
    /* if(!estado)  nuevaTarea.estado = estado; */

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id},nuevaTarea, { new: true })
        
        res.json({tarea})


    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        }
}

//Eliminar una tarea

exports.eliminarTarea = async (req,res) => {
    const {proyecto} = req.query;

try {
   //Verficar si la tarea existe
let tarea = await Tarea.findById(req.params.id);
    if(!tarea) { 
        return res.status(404).json({msg:'Tarea no encontrada'})
    }
    const existeProyecto = await Proyecto.findById(proyecto);
    //Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {//una vez que ya se comprobó que el proyecto existe a la base de datos se comprueba si pertenece al usuario.
        return res.status(401).json({ msg: 'No autorizado' });
    }
    //eliminar
    await Tarea.findOneAndRemove({_id:req.params.id});

    res.json({msg:"Tarea eliminada exitosamente"});


    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        }
}

