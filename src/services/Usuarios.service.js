import * as usuarioModel from '../models/userModel.js';

// 1. OBTENER Y FILTRAR USUARIOS
export const getUsuariosService = async (email) => {
    try {
        return await usuarioModel.getUsuariosService(email);
    } catch (error) {
        console.error("❌ Error en getUsuariosService (Service):", error);
        throw error;
    }
};

// 2. BUSCAR USUARIO POR ID
export const getUsuarioByIdService = async (id) => {
    try {
        return await usuarioModel.getUsuarioByIdService(id);
    } catch (error) {
        console.error("❌ Error en getUsuarioByIdService (Service):", error);
        throw error;
    }
};

// 3. CREAR NUEVO USUARIO
export const createUsuariosService = async (email, password) => {
    try {
        return await usuarioModel.createUsuariosService(email, password);
    } catch (error) {
        console.error("❌ Error en createUsuariosService (Service):", error);
        throw error;
    }
};

// 4. ACTUALIZAR USUARIO
export const updateUsuarioService = async (id, updateData) => {
    try {
        return await usuarioModel.updateUsuarioService(id, updateData);
    } catch (error) {
        console.error("❌ Error en updateUsuarioService (Service):", error);
        throw error;
    }
};

// 5. ELIMINAR USUARIO
export const deleteUsuarioService = async (id) => {
    try {
        return await usuarioModel.deleteUsuarioService(id);
    } catch (error) {
        console.error("❌ Error en deleteUsuarioService (Service):", error);
        throw error;
    }
};
