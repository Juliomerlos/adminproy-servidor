const express = require('express');
const conectarDB = require('./config/db');//Esto conecta la configuración de mongoose con el servidor. Todavía no funciona, ya que hay que llamarla (porque es una función) para poder usar mongoose(mongoDB).
const cors = require('cors');

//Asignación de puerto, se le pone 4000 para que no choque con el de cliente (3000)
const app = express();
conectarDB();

//habilitar cors 
app.use(cors());

//Habilitar express.json

app.use(express.json({extended:true})) //Alternativa a app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 4000;
//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


app.listen(port,'0.0.0.0', ()=>console.log(`El servidor está corriendo en el puerto ${port}`))

