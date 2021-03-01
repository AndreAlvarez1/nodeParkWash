"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conex = void 0;
const environment_1 = require("../global/environment");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const conexiones_1 = require("../conexiones/conexiones");
var sql = require('mysql');
exports.conex = sql.createConnection(conexiones_1.PARKWASH);
setInterval(function () { exports.conex.query('SELECT 1'); }, 4000);
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        // Config Sockets
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        // this.escucharSockets();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
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
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
