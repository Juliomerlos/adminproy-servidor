const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto' //Este es el nombre del modelo de la colección que lo contiene
    }

})

module.exports = mongoose.model('Tarea',TareaSchema);