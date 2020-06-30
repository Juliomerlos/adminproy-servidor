const jwt = require('jsonwebtoken');


module.exports = function(req,res,next) {
    //Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg:'No hay token, permiso no válido'})
    }
    //validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);// función de jwt para verificar si existe el token.

        //cifrado contiene varios datos, entre ellos el usuario y el tiempo de expiración. En nuestro caso metimos en el payload "usuario: {id:usuario.id}"
      
        req.usuario = cifrado.usuario;//Una vez autenticado se guarda en el usuario que realiza la petición. Esto es porque a estas alturas todavía no entra la petición completa hasta que se hayan leído todos los middlewares en la ruta proyectos...
        next()//Con esto se da por concluído el middleware
    }catch(error) {
        res.status(401).json({msg:'Token no válido'});
    }

}