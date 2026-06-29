// rutas
import express from  'express'
import {getAllUsuarios,
getUsuariosID,postUsuarios,
putUsuarios,deleteUsuarios} from '../controller/Usuarios.Controller.js'
const router = express.Router()
import {authentication} from '../middelware/auth.middelware.js'
// metodos




//1
//  RUTA GENERAL Y FILTROS QUERY PARAMTS (SIEMPRE ARRIBA)
// ==========================================
// URL de prueba: http://localhost:3000/api/products?name=loQueBuscas
router.get('/api/usuarios', authentication, getAllUsuarios);

// 2. GET/:ID (BUSCAR POR ID O CATEGORÍA)
// NOTA: Si en app.js usas app.use('/api/products', router), recuerda cambiar aquí a '/:id'
router.get('/api/usuarios/:id',authentication, getUsuariosID); 


// 3 POST 
router.post('/api/usuarios',authentication,postUsuarios);

// 4 PUT 
router.put('/api/usuarios/:id',authentication,putUsuarios) ;

// 5 DELETE 
router.delete('/api/usuarios/:id',authentication,deleteUsuarios);  

export default router
/*CURL
1. GET con Query String (Filtrar usuarios)bash
curl -X GET "http://localhost:4000/api/usuarios?email=juan"
2. GET con Parámetro ID (Buscar usuario)bash
curl -X GET "http://localhost:4000/api/usuarios/ID_DE_FIRESTORE"
3. POST (Crear usuario)bas
curl -X POST "http://localhost:4000/api/usuarios" \
     -H "Content-Type: application/json" \
     -d '{"email": "nuevo@gmail.com", "password": "miPasswordSeguro123"}'
4. PUT (Actualizar usuario)bash
curl -X PUT "http://localhost:4000/api/usuarios/ID_DE_FIRESTORE" \
     -H "Content-Type: application/json" \
     -d '{"password": "nuevaContrasena456"}'
5. DELETE (Eliminar usuario)bash
curl -X DELETE "http://localhost:4000/api/usuarios/ID_DE_FIRESTORE"
  
*/