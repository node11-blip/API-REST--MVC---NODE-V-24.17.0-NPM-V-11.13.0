/*----------TAREA
1. Configurar Firestore en tu Proyecto 
● Crea un nuevo proyecto en Firebase y configura Firestore. 
Diseña la estructura de la base de datos siguiendo el esquema de los JSON 
que usaste previament
2. Configurar el servicio de Firebase/Firestore en tu proyecto: 
● Instala las dependencias necesarias. 
Crea un archivo de configuración con las credenciales aportadas por 
Fireba
● Coloca tus credenciales en un archivo .env  y utilizalas en tu archivo de 
configuración. 
3. Verifica la compatibilidad con otras capas: 
Valida que el código de los servicios y controladores siga funcionando 
correctamente.
Utiliza POSTMAN para consultar tu API Rest y recibir los datos provenientes 
desde Firestor





*/
import express from 'express' 
import dotenv from "dotenv"
import cors from 'cors'  
import routersProducts from './src/routers/routersProducts.js'
import routerUsuarios from './src/routers/routerUsuarios.js'
import authrouter from './src/routers/auth.router.js'     
import { authentication } from './src/middelware/auth.middelware.js'

dotenv.config()
const app = express()

// ==========================================
// 1. MIDDLEWARES GLOBALES DE CONFIGURACIÓN
// ==========================================
app.use(cors()) // 👈 CORREGIDO: Siempre debe ir primero para habilitar el acceso al navegador
app.use(express.json()) // Permite aceptar JSON en las peticiones (arregla tu req.body undefined)
app.use(express.urlencoded({ extended: true })) // Permite leer datos Form-URL-Encoded

// ==========================================
// 2. RUTA PRINCIPAL (DOMINIO)
// ==========================================
app.get('/', (req, res) => {
    res.send("RUTA PRINCIPAL")
})

// ==========================================
// 3. RUTAS DE LA APLICACIÓN
// ==========================================
app.use(routersProducts)
app.use(routerUsuarios)
app.use('/api/auth', authrouter)

// ==========================================
// 4. MANEJO DE RUTAS NO ENCONTRADAS (404)
// ==========================================
app.use((req, res, next) => {
    res.status(404).send("rutas no encontradas")
})

// ==========================================
// 5. CONTROLADOR GLOBAL DE ERRORES (500 / JSON Malformado)
// ==========================================
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(`[Error de Sintaxis]: ${err.message}`)
    return res.status(400).json({
      status: 'error',
      message: 'El cuerpo de la petición (JSON) tiene un error de sintaxis.'
    })
  }
  next(err)
})

// ==========================================
// 6. INICIALIZACIÓN DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
