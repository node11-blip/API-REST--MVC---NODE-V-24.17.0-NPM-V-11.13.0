import { generateToken } from '../utils/token.generator.js';
import { loginUsuarioService } from '../models/userModel.js'; 

export const login = async (req, res) => {
    try {
        console.log("📥 Datos recibidos en login:", req.body);
        const { email, password } = req.body;

        // 1. Validación básica de campos obligatorios
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Faltan campos obligatorios (email o password)" });
        }

        // 2. Llamada al servicio que creamos en el paso anterior
        const resultado = await loginUsuarioService(email, password);

        // 3. Si las credenciales son incorrectas (OK: false)
        if (!resultado.OK) {
            return res.status(401).json({ status: "error", message: resultado.mensaje });
        }

        // --- NUEVOS CAMBIOS PARA EL TOKEN ---
        // 4. Generar el token usando los datos del usuario autenticado
        const token = generateToken({ 
            id: resultado.usuario.id, 
            email: resultado.usuario.email 
            // Agrega aquí otros datos públicos si tu función lo requiere (ej. role: resultado.usuario.role)
        });

        // 5. Si el login es exitoso (ahora incluye el token)
        return res.status(200).json({ 
            status: "success",
            message: resultado.mensaje, 
            usuario: resultado.usuario,
            token: token // Enviamos el token al cliente
        });

    } catch (error) {
        console.error("❌ Error en el controlador de login:", error);
        return res.status(500).json({ status: "error", message: "Error interno en el servidor al intentar loguear" });
    }
};
