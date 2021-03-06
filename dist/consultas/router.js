"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../classes/server");
// const axios = require('axios') // lo use para maps
var https = require('https');
const router = express_1.Router();
///// ============================================= /////
///// ============================================= /////
///// =================== GETS ==================== /////
///// ============================================= /////
///// ============================================= /////
router.get('/recintos', function (req, res) {
    console.log('recintos');
    const query = "SELECT * FROM recintos";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/usuarios/:email', function (req, res) {
    console.log('tarea', req.params.email);
    const query = "SELECT * FROM users WHERE email = '" + req.params.email + "' ";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/cars/:user', function (req, res) {
    console.log('cars', req.params.user);
    const query = "SELECT * FROM cars WHERE userId = '" + req.params.user + "' AND status > 0";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/carsXrecinto/:recinto', function (req, res) {
    let query = "SELECT c.id, c.notToday, c.patente, c.marca, c.modelo, c.color, c.tipo, c.recintoId, r.nombre as recinto, c.status, c.size, c.planId, p.description, p.price_normal_car, p.price_big_car, p.frequency_top, p.frequency_full, c.userId, u.firstName, u.lastName, u.cellphone, u.lastName FROM cars c LEFT JOIN recintos r ON c.recintoId = r.id LEFT JOIN users u ON c.userId = u.id LEFT JOIN plans p ON c.planId = p.id where c.status > 0 AND c.recintoId =  '" + req.params.recinto + "'";
    console.log('cars x recinto', req.params.recinto);
    if (req.body.recinto === 'todos') {
        query = "SELECT c.id, c.notToday, c.patente, c.marca, c.modelo, c.color, c.tipo, c.recintoId, r.nombre as recinto, c.status, c.size, c.planId, p.description, p.price_normal_car, p.price_big_car, p.frequency_top, p.frequency_full, c.userId, u.firstName, u.lastName, u.cellphone, u.lastName FROM cars c LEFT JOIN recintos r ON c.recintoId = r.id LEFT JOIN users u ON c.userId = u.id LEFT JOIN plans p ON c.planId = p.id where c.status > 0 ";
    }
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/users', function (req, res) {
    const query = "SELECT * FROM users ORDER BY id DESC";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/team', function (req, res) {
    const query = "SELECT * FROM users WHERE level != 1";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/plans', function (req, res) {
    const query = "SELECT * FROM plans";
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/washes/:fechaIni/:fechaFin/:recinto', function (req, res) {
    let query = "SELECT w.id, w.washerId, w.status, w.carId, w.recintoId, r.nombre as recinto, w.discount, w.receipt, w.observation, w.washDate w.type, w.updateDate, c.patente, c.marca, c.modelo, c.color, c.tipo, c.size, u.firstName as washerFirst, u.lastName as washerLast, p.description, p.name as planName FROM wash w  LEFT JOIN users u ON w.washerId = u.id  LEFT JOIN cars c ON w.carId = c.id LEFT JOIN plans p ON c.planId = p.id LEFT JOIN recintos r ON w.recintoId = r.id  where w.washDate between '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "' AND w.recintoId = '" + req.params.recinto + "'  ";
    if (req.params.recinto === 'Todos') {
        query = "SELECT w.id, w.washerId, w.status, w.carId, w.recintoId, r.nombre as recinto, w.discount, w.receipt, w.observation, w.washDate, w.updateDate, w.type, c.patente, c.marca, c.modelo, c.color, c.tipo, c.size, u.firstName as washerFirst, u.lastName as washerLast, p.description, p.name as planName FROM wash w  LEFT JOIN users u ON w.washerId = u.id  LEFT JOIN cars c ON w.carId = c.id LEFT JOIN plans p ON c.planId = p.id LEFT JOIN recintos r ON w.recintoId = r.id  where w.washDate between '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "'   ";
    }
    console.log('query washes', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/washesXuser/:fechaIni/:fechaFin/:user', function (req, res) {
    const query = "SELECT w.id, w.washerId, w.status, w.carId, w.recintoId, r.nombre as recinto, w.discount, w.receipt,w.type , w.observation, w.washDate, w.updateDate, c.patente, c.marca, c.modelo, c.color, c.tipo, c.size, u.firstName as washerFirst, u.lastName as washerLast, p.description FROM wash w  LEFT JOIN users u ON w.washerId = u.id  LEFT JOIN cars c ON w.carId = c.id LEFT JOIN plans p ON c.planId = p.id LEFT JOIN recintos r ON w.recintoId = r.id  where w.washDate between '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "' AND c.userId = '" + req.params.user + "'  ";
    console.log('query washes x usuer', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/washesXcar/:fechaIni/:fechaFin/:car', function (req, res) {
    let query = "SELECT w.id, w.washerId, w.status, w.type , w.carId, w.recintoId, r.nombre as recinto, w.discount, w.receipt, w.observation, w.washDate, w.updateDate, c.patente, c.marca, c.modelo, c.color, c.tipo, c.size, u.firstName as washerFirst, u.lastName as washerLast, p.description FROM wash w  LEFT JOIN users u ON w.washerId = u.id  LEFT JOIN cars c ON w.carId = c.id LEFT JOIN plans p ON c.planId = p.id LEFT JOIN recintos r ON w.recintoId = r.id  where w.washDate between '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "' AND w.carId = '" + req.params.car + "'  ";
    if (req.params.car === 'Todos') {
        query = "SELECT w.id, w.washerId, w.status,w.type, w.carId, w.recintoId, r.nombre as recinto, w.discount, w.receipt, w.observation, w.washDate, w.updateDate, c.patente, c.marca, c.modelo, c.color, c.tipo, c.size, u.firstName as washerFirst, u.lastName as washerLast, p.description FROM wash w  LEFT JOIN users u ON w.washerId = u.id  LEFT JOIN cars c ON w.carId = c.id LEFT JOIN plans p ON c.planId = p.id LEFT JOIN recintos r ON w.recintoId = r.id  where w.washDate between '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "'   ";
    }
    console.log('query busco lavados por auto', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/wash/:id', function (req, res) {
    let query = "SELECT * FROM wash WHERE id = " + req.params.id + " ";
    console.log('query wash id', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/photos/:washId', function (req, res) {
    let query = "SELECT * FROM photos WHERE washId = " + req.params.washId + " ";
    console.log('query washId', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/cards/:userId', function (req, res) {
    let query = "SELECT * FROM cards WHERE userId = " + req.params.userId + " ";
    console.log('query cards', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
router.get('/key', function (req, res) {
    let query = "SELECT * FROM secure_info WHERE id = 1 ";
    console.log('query key', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
        // res.json({ resultado: 'ok', datos: rows[0].CODIGO });
    });
});
// const apiKey = 'AIzaSyDf3shIjRBpNvANK2Sd5dm_lKKz9mnFFyM'
// router.get('/predicciones/:input/:token', async (req, res, next) => {
//     console.log('input', req.params.input);
//     console.log('token', req.params.token);
//     try {
//       const {data} = await axios.get(
//      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.input}&region=cl&key=${apiKey}&sessiontoken=${req.params.token}`)
//       res.json(data)
//       } 
//     catch (err) {
//      next(err)
//    }
//    })
// router.get('/geocode/:method/:value/', async (req, res, next) => {
//     console.log('method', req.params.method);
//     console.log('value', req.params.value);
//     try {
//       const {data} = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?${req.params.method}${req.params.value}&key=${apiKey}`)
//       res.json(data)
//       } 
//     catch (err) {
//      next(err)
//    }
//    })
/////=============================================/////
/////=============================================/////
/////=============== POST & UPDATES ==============/////
/////=============================================/////
/////=============================================/////
router.post('/post/usuarios/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        query = "INSERT INTO users (firstName, lastName, cellphone, email, gender, rut, address, city, lat, lng, status, level) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.cellphone + "', '" + req.body.email + "', '" + req.body.gender + "', '" + req.body.rut + "', '" + req.body.address + "','" + req.body.city + "'," + req.body.lat + "," + req.body.lng + ",1,1)";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE users SET firstName = '" + req.body.firstName + "', lastName = '" + req.body.lastName + "', cellphone = '" + req.body.cellphone + "', email = '" + req.body.email + "', gender = '" + req.body.gender + "', rut = '" + req.body.rut + "', address = '" + req.body.address + "', city = '" + req.body.city + "', lat = " + req.body.lat + ", lng = '" + req.body.lng + "', status = " + req.body.status + ",  level = " + req.body.level + "  WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE users SET status = 0 WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
// CREAR PLANES
// INSERT INTO plans (name, description, recintoId, price_normal_car, price_big_car, frequency_top, frequency_full, status) VALUE ('DeMaria Platinum', 'Lavado Top Exterior y Full Wash intercalados cada 2 semanas', 1, 14990, 19990, 2, 2, 1)
router.post('/post/oferta/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        let DATOS = '';
        for (let x in req.body) {
            DATOS += "( " + req.body[x].storeId + ",'" + req.body[x].name + "','" + req.body[x].codigo + "','" + req.body[x].category + "','" + req.body[x].unidad + "'," + req.body[x].precio + "," + req.body[x].modifobli + "," + req.body[x].maxmodifi + "," + req.body[x].maxmodifi2 + ",'" + req.body[x].foto + "'," + req.body[x].status + "," + req.body[x].sort + "," + req.body[x].esMenu + "),";
        }
        DATOS = DATOS.slice(0, -1);
        query = "INSERT INTO productos (storeId, name, codigo, category, unidad, precio, modifobli, maxmodifi, maxmodifi2, foto, status, sort, esMenu)  VALUES" + DATOS;
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE productos SET name = '" + req.body.name + "', unidad = '" + req.body.unidad + "', precio = " + req.body.precio + ", foto = '" + req.body.foto + "', status = " + req.body.status + ", sort = " + req.body.sort + ", esMenu = " + req.body.esMenu + " WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE productos SET status = 0 WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/post/cars/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        query = "INSERT INTO cars (patente, marca, modelo, color, tipo, recintoId, userId, status, size, planId, notToday) VALUES ('" + req.body.patente + "', '" + req.body.marca + "', '" + req.body.modelo + "', '" + req.body.color + "', '" + req.body.tipo + "', " + req.body.recintoId + ", " + req.body.userId + ", 1, " + req.body.size + ", " + req.body.planId + ", " + req.body.notToday + ")";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE cars SET patente = '" + req.body.patente + "', marca = '" + req.body.marca + "', modelo = '" + req.body.modelo + "', color = '" + req.body.color + "', tipo = '" + req.body.tipo + "', recintoId = '" + req.body.recintoId + "', recintoId = " + req.body.recintoId + ", status = " + req.body.status + ", size = " + req.body.size + ", planId = " + req.body.planId + ",  notToday = " + req.body.notToday + " WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE cars SET status = 0 WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/post/wash/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        query = "INSERT INTO wash (washerId, carId, recintoId, discount, status, receipt, observation, washDate, updateDate, type) VALUES (" + req.body.washerId + "," + req.body.carId + ", " + req.body.recintoId + ", " + req.body.discount + ", " + req.body.status + ", '" + req.body.receipt + "', '" + req.body.observation + "', '" + req.body.washDate + "', '" + req.body.updateDate + "','" + req.body.type + "')";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE wash SET washerId = " + req.body.washerId + ", carId = " + req.body.carId + ", status = " + req.body.status + ", discount = " + req.body.discount + ", observation = '" + req.body.observation + "', washDate = '" + req.body.washDate + "', receipt = '" + req.body.receipt + "', updateDate = '" + req.body.updateDate + "', type = '" + req.body.type + "'  WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE wash SET status = 0 WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query wash ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/post/photos/:tarea', function (req, res) {
    console.log('tarea', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        query = "INSERT INTO photos (washId, tipo, url, status) VALUES (" + req.body.washId + ",'" + req.body.tipo + "', '" + req.body.url + "', 1)";
    }
    else if (req.params.tarea === 'update') {
        query = "UPDATE photos SET washId = " + req.body.washId + ", tipo = '" + req.body.tipo + "', url = '" + req.body.url + "' WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE photos SET status = " + req.body.status + " WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query photos ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.post('/post/card/:tarea', function (req, res) {
    console.log('Tarea aqui', req.params.tarea);
    let query = '';
    if (req.params.tarea === 'insert') {
        console.log('body de insert', req.body);
        query = "INSERT INTO cards (number, status, active, created_at, short, userId) VALUES ('" + req.body.number + "'," + req.body.status + ", " + req.body.active + ", '" + req.body.created_at + "'," + req.body.short + "," + req.body.userId + ")";
    }
    else if (req.params.tarea === 'update') {
        console.log('body de update', req.body);
        query = "UPDATE cards SET status = " + req.body.status + ", active = " + req.body.active + " WHERE id = " + req.body.id + " ";
    }
    else if (req.params.tarea === 'borrar') {
        query = "UPDATE cards SET status = 0 WHERE id = " + req.body.id + " ";
    }
    else {
        return;
    }
    console.log('query cards ->', query);
    server_1.conex.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});
router.get('/test', function (req, res) {
    res.json({ resultado: 'ok', datos: 'funciona' });
});
exports.default = router;
