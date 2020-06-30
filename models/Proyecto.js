const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,//Esta es una referencia a la collección de usuarios. De ahí que "ref" sea esa colección 
        ref: 'Usuario'
    },
    creado:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyecto',ProyectoSchema);