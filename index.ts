import Server from "./classes/server";

const sql = require('mysql')
const server = Server.instance;

// Para las rutas
import general from "./consultas/router"
import webpay from "./consultas/webpay"

import bodyParser from 'body-parser';
import cors from 'cors';


//////// Utilidades ////////
server.app.use( bodyParser.urlencoded({extended:true}) );
server.app.use( bodyParser.json() );
server.app.use( cors({origin:true, credentials:true}) );

//// Rutas de servicios ////

server.app.use('/', general);
server.app.use('/', webpay);


server.start( ()=> {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
    
})