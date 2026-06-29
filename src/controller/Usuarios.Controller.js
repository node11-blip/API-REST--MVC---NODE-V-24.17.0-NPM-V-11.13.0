import {
    getUsuariosService,
    getUsuarioByIdService,
    createUsuariosService,
     updateUsuarioService,
    deleteUsuarioService
} from '../services/Usuarios.service.js';
// 1. OBTENER TODOS LOS USUARIOS (Permite filtrar por email si se pasa por query)
export const getAllUsuarios = async (req, res) => {
    try {
        const { email } = req.query;
        // Se llama al servicio de usuarios esperando el resultado
        const resultado = await getUsuariosService(email);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al obtener los usuarios' });
    }
};

// 2. OBTENER USUARIO POR ID
export const getUsuariosID = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await getUsuarioByIdService(id);
        
        if (resultado === null) {
            return res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
        }
        
        return res.status(200).json({ mensaje: "Usuario encontrado", usuario: resultado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al procesar la búsqueda del usuario' });
    }
};

// 3. CREAR NUEVO USUARIO
export const postUsuarios = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validación de campos obligatorios para usuarios
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan campos obligatorios (email o password)" });
        }
        
        // Llama al servicio que corregimos en el paso anterior
        const nuevoUsuario = await createUsuariosService(email, password);
        return res.status(201).json({ mensaje: "USUARIO agregado", usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error interno al intentar crear el usuario' });
    }
};

// 4. ACTUALIZAR USUARIO
export const putUsuarios = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; // Puede contener email, password o ambos

        const usuarioActualizado = await updateUsuarioService(id, updateData);
        
        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        return res.status(200).json({ 
            mensaje: "USUARIO actualizado", 
            usuario: usuarioActualizado 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno al actualizar" });
    }
};

// 5. ELIMINAR USUARIO
export const deleteUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        
        const usuarioEliminado = await deleteUsuarioService(id);
        
        if (!usuarioEliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json({ message: "Usuario eliminado", usuario: usuarioEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error interno al intentar eliminar el usuario' });
    }
};
