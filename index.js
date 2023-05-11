import express from "express";
import  router  from "./routes/index.js";
import db from "./config/db.js";

const app = express();


//conectar la base de datos
db.authenticate()
    .then(() => console.log('DB conectada'))
    .catch(error => console.log(error));

//definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual para el footer
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSito = 'Agencia De Viajes';
    next();
});

//definir body parser para los datos del form
app.use(express.urlencoded({
    extended: true
}));

//definir la carpeta publica
app.use(express.static('Public'));

//agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el port ${port}`);
});