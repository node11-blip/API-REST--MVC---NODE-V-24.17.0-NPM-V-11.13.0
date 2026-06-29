// rutas
import express from  'express'
import {getAllproducts,
getproductsID,postProducts,
putProducts,deleteProducts} from '../controller/Products.Controller.js'
const router = express.Router()

// metodos




//1
//  RUTA GENERAL Y FILTROS QUERY PARAMTS (SIEMPRE ARRIBA)
// ==========================================
// URL de prueba: http://localhost:3000/api/products?name=loQueBuscas
router.get('/api/products',getAllproducts);

// 2. GET/:ID (BUSCAR POR ID O CATEGORÍA)
// NOTA: Si en app.js usas app.use('/api/products', router), recuerda cambiar aquí a '/:id'
router.get('/api/products/:id',getproductsID); 


// 3 POST 
router.post('/api/products',postProducts);

// 4 PUT 
router.put('/api/products/:id',putProducts);

// 5 DELETE 
router.delete('/api/products/:id',deleteProducts);  

export default router
/*CURL
curl -X GET http://localhost:4000/api/products GETT ANDA 
curl -X GET "http://localhost:4000/api/products?modelo=negro&name=Teclado Mecánico" QUERY 
curl -X GET http://localhost:4000/api/products/1
curl -X GET http://localhost:4000/api/products/abc
curl -X POST http://localhost:4000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name": "Teclado Mecánico", "category": "electronica", "price": 150, "modelo":"negro"}'
curl -X PUT http://localhost:4000/api/products/1 \
     -H "Content-Type: application/json" \
     -d '{"price": 350, "modelo": "Azul Oscuro"}'
curl -X DELETE http://localhost:4000/api/products/1
  
*/