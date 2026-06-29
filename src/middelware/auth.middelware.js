import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization

    // 1. NUEVA VALIDACIÓN: Verificar si la cabecera está completamente vacía, no existe o tiene solo espacios
    if (!authHeader || authHeader.trim() === "") {
        return res.status(400).json({ 
            error: "Cabecera vacía",
            mensaje: "Por favor, agrega el token en la cabecera 'Authorization' e intenta de nuevo." 
        })
    }

    // 2. Validar que la cabecera empiece con el formato estándar 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: "Formato inválido",
            mensaje: "El token debe iniciar con la palabra 'Bearer ' seguida de un espacio." 
        })
    }

    // 3. Extraer el token eliminando la palabra 'Bearer '
    const token = authHeader.split(' ')[1]

    // Validación extra por si escribieron "Bearer " pero dejaron el token vacío después del espacio
    if (!token || token.trim() === "") {
        return res.status(401).json({ 
            error: "Token ausente",
            mensaje: "Se envió la palabra Bearer pero no el token correspondiente." 
        })
    }

    try {
        // 4. Verificar el token usando tu clave secreta de las variables de entorno
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // 5. Guardar los datos del usuario en la petición para usarlo en los controladores
        req.usuario = decoded 
        
        // 6. Dar paso a la siguiente función/controlador
        next()
    } catch (error) {
        return res.status(403).json({ 
            error: "Token inválido",
            mensaje: "El token proporcionado es inválido o ya ha expirado." 
        })
    }
}
