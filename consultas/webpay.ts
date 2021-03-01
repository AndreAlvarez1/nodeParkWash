import { Router, Request, Response } from 'express'
import { conex } from "../classes/server";
const router = Router();


const Transbank = require('transbank-sdk');



const amount = 1000;  

// Identificador del usuario en el comercio
const username = "pepito"
// Correo electrónico del usuario
const email = "pepito@gmail.com";

const urlReturn = "https://callback/resultado/de/transaccion";


router.post('/initInscription',
function(req: Request ,res: Response) { 
    console.log('initInscription');
    const transaction = new Transbank.Webpay(
    Transbank.Configuration.forTestingWebpayOneClickNormal()
  ).getOneClickTransaction();
});


// transaction.initInscription(username, email, urlReturn)
//   .then((response:any) => {
//     const token = response.token;
//     const formAction = response.urlWebpay;
//   });
//   .catch((error:any) => {
//     console.log(error.toString());
//   });



//   router.post('/pagoAppetito/:orderId/:storeId', 

//     function(req: Request ,res: Response) {
//       console.log('body', req.body);
      
//       const transactions: any[] = [];

//       transactions.push(req.body);
//       console.log('transactions', transactions);

//         console.log('1-funcion init transaction');
//         console.log('buy order', buyOrder);
//         console.log('sessionId', sessionId);
//         console.log('returnUrl', returnUrl);
//         console.log('finalUrl', finalUrl);
//         console.log('transactions', transactions);

//         transaction.initTransaction(req.body.buyOrder, sessionId, returnUrl, finalUrl, transactions)
//         .then((response: any) => {
//             console.log('2-hay respuesta AAAA!!!', response);
//           // response tendrá el token de respuesta de esta transacción

//           const token = response.token;
//           const total = transactions[0].amount;

//           console.log('order id', req.params.orderId);
//           console.log('token', token);
//           console.log('total', total);
//           console.log('storeId', req.params.storeId);

//           const query = "INSERT INTO transactions (token, orderID, buyOrder, total, storeID, status) VALUES ( '" + response.token + "', " + req.params.orderId + ", '" + buyOrder + "', " + total + ",  " + req.params.storeId + ", " + 1 + " )";
//           console.log('query trasanctions ->', query);
    
//           conex.query(query, function(err:any, rows:any, fields:any) {
//               if (err) throw err;
//               res.json({ url: response.url, token:response.token });

//           });


      
//         })
//         .catch(( error: any) => {
//             console.log('0-errorrrrr', error);
//             console.log(error.toString());
//         });
// });

export default router;