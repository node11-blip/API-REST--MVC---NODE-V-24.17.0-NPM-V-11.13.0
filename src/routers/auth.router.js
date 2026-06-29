import {Router} from 'express'
import {login} from '../controller/auth.Controller.js'
const router = Router()
router.post('/login',login)
export default router

/*1. Caso Exitoso (Credenciales Correctas)
curl -X POST "http://localhost:4000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "ale@yahoo.com", "password": "ca7/653%fda"}'
2. Caso de Error (Credenciales Incorrectas)
curl -X POST "http://localhost:4000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "inexistente@gmail.com", "password": "claveIncorrecta"}'

*/