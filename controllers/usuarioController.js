const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); 
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');//Se importa la dependencia de jwt

exports.crearUsuario = async (req,res) => {

const errores = validationResult(req)

if(!errores.isEmpty()){
    
return res.status(400).json({msg: errores.array()[0].msg})
}

    const {email, password} = req.body;

    try{
       
        let usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        usuario = new Usuario(req.body);
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id//Al guardar el usuario se genera un id en la DB
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        },(error, token)=>{
            if(error) throw error;
            //El mensaje de confirmación se mueve hacia dentro de la respuesta del jwt
            res.json({token})
        });


        //Mensaje de confirmación
       /*  res.json({msg: 'El usuario ha sido agregado exitosamente a la DB'}) */
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
