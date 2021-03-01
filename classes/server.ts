import { SERVER_PORT } from '../global/environment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';


import { PARKWASH } from '../conexiones/conexiones';

var sql = require('mysql');
export const conex = sql.createConnection(PARKWASH)

setInterval(function (){conex.query('SELECT 1');}, 4000)

export default class Server {

    private static _intance: Server;

    public app         : express.Application ;
    public port        : number

    // Config Sockets
    public io          : socketIO.Server;
    private httpServer : http.Server;


    private constructor() {
        this.app          = express();
        this.port         = SERVER_PORT
        
        // Config Sockets
        this.httpServer   = new http.Server( this.app );
        this.io           = socketIO( this.httpServer )
        // this.escucharSockets();
    }

    public static get instance() {
        return this._intance || (this._intance = new this() );
    }

    // private escucharSockets() {
    //     console.log('escuchando conexiones - sockets');

    //     this.io.on('connection', cliente => {

    //         console.log('Nuevo Cliente conectado', cliente.id);

    //         // Conectar Cliente
    //         socket.conectarCliente( cliente );

    //         // Configurar Usuario
    //         socket.configurarUsuario(cliente, this.io);

    //         // Obtener Usuarios activos
    //         socket.obtenerUsuarios(cliente, this.io);
            
    //         // Mensajes
    //         socket.mensaje(cliente, this.io);

    //         // Desconectar
    //         socket.desconectar(cliente, this.io);
            

    //         });
    // }

    start( callback: any ){
        this.httpServer.listen( this.port, callback );
    }
} 