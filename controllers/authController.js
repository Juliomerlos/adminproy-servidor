const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); 
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {
    const errores = validationResult(req)

if(!errores.isEmpty()){
return res.status(400).json({errores: errores.array()})
}
const {email,password} = req.body;
try {
    let usuario = await Usuario.findOne({email})
    if(!usuario) {
        return res.status(400).json({msg:'El usuario no existe'})
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password)//Aquí se compara la contraseña del request con la contraseña asociada al usuario que coincide con el del request.
    if(!passCorrecto) {
        return res.status(400).json({msg:'Password Incorrecto'})
    } else {
        console.log('password correcto')
    }

    const payload = {
        usuario: {
            id: usuario.id//Al guardar el usuario se genera un id en la DB
        }
    };

    //firma el jwt
    jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 3600
    },(error, token)=>{
        if(error) throw error;
        //El mensaje de confirmación se mueve hacia dentro de la respuesta del jwt
        res.json({token})
    });


}catch(error) {
    console.log(error)
}
}

//Obtención de qué usuario está autenticado
exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await (await Usuario.findById(req.usuario.id))/* .select('-password') *///Del middleware auth se guardó un usuario en el request una vez que se pudo autentificar. Por lo cual se puede acceder a su id. Con select ('-password) quitas el password de la respuesta json.
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'hubo un error'})
    }
}