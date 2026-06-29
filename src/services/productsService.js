import *as productoService from '../models/productModel.js'
// 1. OBTENER Y FILTRAR
export const getProductsService = async (name, modelo) => {
    try {
        return await productoService.getProductsService(name, modelo);
    } catch (error) {
        console.error("Error en getProductsService (Controller):", error);
        throw error;
    }
};

// 2. BUSCAR POR ID O CATEGORÍA
export const getProductByIdOrCategoryService = async (parametro) => {
    try {
        return await productoService.getProductByIdOrCategoryService(parametro);
    } catch (error) {
        console.error("Error en getProductByIdOrCategoryService (Controller):", error);
        throw error;
    }
};

// 3. CREAR NUEVO 
export const createProductService = async (name, price, modelo, category) => {
    try {
        return await productoService.createProductService(name, price, modelo, category);
    } catch (error) {
        console.error("Error en createProductService (Controller):", error);
        throw error;
    }
};

// 4. ACTUALIZAR
export const updateProductService = async (id, updateData) => {
    try {
        return await productoService.updateProductService(id, updateData);
    } catch (error) {
        console.error("Error en updateProductService (Controller):", error);
        throw error;
    }
};

// 5. ELIMINAR
export const deleteProductService = async (id) => {
    try {
        return await productoService.deleteProductService(id);
    } catch (error) {
        console.error("Error en deleteProductService (Controller):", error);
        throw error;
    }
};
