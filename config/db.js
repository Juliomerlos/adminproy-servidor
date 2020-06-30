const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'}) //ESte sirve para poder leer el contenido de variables.env (si está dentro de una carpeta hay que incluirla).

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}


const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, options);//Con esto podemos leer los datos de variables.env, que en este caso es la url de la api.
        console.log('conexión exitosa con la DB');
    } catch(error) {
        console.log(error);
        process.exit(1)//En caso de que haya un error en la conexión, que detenga la app
    }
}
module.exports = conectarDB;

