import {
    getProductsService,
    getProductByIdOrCategoryService,
    createProductService,
    updateProductService,
    deleteProductService
} from '../services/productsService.js';

export const getAllproducts = async (req, res) => {
    try {
        const { modelo, name } = req.query;
        // CORREGIDO: Agregado await para esperar los productos filtrados
        const resultado = await getProductsService(name, modelo);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
    }
};

export const getproductsID = async (req, res) => {
    try {
        const { id } = req.params;
        // CORREGIDO: Agregado await para esperar la búsqueda por ID o categoría
        const resultado = await getProductByIdOrCategoryService(id);
        
        if (resultado === null) {
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        if (Array.isArray(resultado) && resultado.length === 0) {
            return res.status(404).json({ error: `No se encontraron productos ni la categoría '${id}'` });
        }
        if (resultado.tipo === "ID") {
            return res.status(200).json({ mensaje: resultado.mensaje, producto: resultado.datos });
        }
        return res.status(200).json({ mensaje: resultado.mensaje, productos: resultado.datos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al procesar la búsqueda del producto' });
    }
};

export const postProducts = async (req, res) => {
    try {
        const { name, price, modelo, category } = req.body;
        if (!name || !price || !modelo || !category) {
            return res.status(400).json({ error: "Faltan campos obligatorios (name, price, modelo o category)" });
        }
        // CORREGIDO: Agregado await para esperar la creación y escritura en el JSON
        const nuevoProducto = await createProductService(name, price, modelo, category);
        return res.status(201).json({ mensaje: "PRODUCTO agregado", producto: nuevoProducto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error interno al intentar crear el producto' });
    }
};

export const putProducts = async (req, res) => {
    try {
        // 1. Extraer el id de los parámetros de la URL (:id)
        const { id } = req.params; 
        const updateData = req.body;

        // 2. Ejecutar el servicio con el ID de la URL
        const productoActualizado = await updateProductService(id, updateData);
        
        // 3. Si el servicio devolvió null, es porque docSnap.exists() fue falso
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        return res.status(200).json({ 
            mensaje: "PRODUCTO actualizado", 
            producto: productoActualizado 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno al actualizar" });
    }
};


export const deleteProducts = async (req, res) => {
    try {
        // CORREGIDO: Quitamos Number() para no destruir los IDs que tienen letras
        const { id } = req.params;
        
        const productoEliminado = await deleteProductService(id);
        
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.json({ message: "Producto eliminado", product: productoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error interno al intentar eliminar el producto' });
    }
};

