import { db } from "../config/firebase.js"; 
import { 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where 
} from "firebase/firestore";

const productosRef = collection(db, "productos");
const limpiarTexto = (texto) => texto.trim().toLowerCase();

// 1. OBTENER Y FILTRAR
export const getProductsService = async (name, modelo) => {
    try {
        const snapshot = await getDocs(productosRef);
        let productosFiltrados = [];
        
        snapshot.forEach(doc => {
            productosFiltrados.push({ id: doc.id, ...doc.data() });
        });
        
        if (name) {
            productosFiltrados = productosFiltrados.filter(p => 
                p.name && limpiarTexto(p.name).includes(limpiarTexto(name))
            );
        }
        if (modelo) {
            productosFiltrados = productosFiltrados.filter(p => 
                p.modelo && limpiarTexto(p.modelo).includes(limpiarTexto(modelo))
            );
        }
        
        return {
            mensaje: (name || modelo) ? "PRODUCTOS FILTRADOS" : "TODOS LOS PRODUCTOS",
            cantidad: productosFiltrados.length,
            productos: productosFiltrados
        };
    } catch (error) {
        console.error("Error en getProductsService:", error);
        throw new Error("No se pudieron obtener los productos");
    }
};

// 2. BUSCAR POR ID O CATEGORÍA
export const getProductByIdOrCategoryService = async (parametro) => {
    try {
        // 1. Buscar directamente por Categoría
        const q = query(productosRef, where("category", "==", parametro));
        const querySnapshot = await getDocs(q);
        
        // Retornar estructura limpia si no hay coincidencias
        if (querySnapshot.empty) {
            return {
                tipo: "CATEGORIA",
                mensaje: "NO SE ENCONTRARON RESULTADOS",
                datos: [],
                totalProductos: 0
            };
        }
        
        const productosCategoria = [];
        querySnapshot.forEach(doc => {
            productosCategoria.push({ id: doc.id, ...doc.data() });
        });
        
        // 2. Contar la cantidad de productos encontrados en el array
        const totalProductos = productosCategoria.length;
        
        return { 
            tipo: "CATEGORIA", 
            mensaje: `PRODUCTOS DE LA CATEGORÍA ${String(parametro).toUpperCase()} ENCONTRADOS`, 
            datos: productosCategoria,
            totalProductos: totalProductos
        };
    } catch (error) {
        console.error("Error en getProductByIdOrCategoryService:", error);
        throw new Error("Error al buscar la categoría");
    }
};


// 3. CREAR NUEVO (POST)
export const createProductService = async (name, price, modelo, category) => {
    try {
        const nuevoProducto = {
            name: name,
            price: Number(price),
            modelo: modelo,
            category: category
        };
        
        const docRef = await addDoc(productosRef, nuevoProducto);
        
        return {
            id: docRef.id,
            ...nuevoProducto
        };
    } catch (error) {
        console.error("Error en createProductService:", error);
        throw new Error("No se pudo crear el producto");
    }
};

// 4. ACTUALIZAR (PUT)
export const updateProductService = async (id, updateData) => {
    try {
        // 1. Convertir el id a String por seguridad con Firestore
        const idString = String(id);
        const docRef = doc(db, "productos", idString);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) return null;
        
        const datosActualizar = {};
        if (updateData.name !== undefined) datosActualizar.name = updateData.name;
        if (updateData.price !== undefined) datosActualizar.price = Number(updateData.price);
        if (updateData.modelo !== undefined) datosActualizar.modelo = updateData.modelo;
        if (updateData.category !== undefined) datosActualizar.category = updateData.category;
        
        await updateDoc(docRef, datosActualizar);
        
        return {
            id: Number(id), // Lo retornamos como número para mantener la consistencia
            ...docSnap.data(),
            ...datosActualizar
        };
    } catch (error) {
        console.error("Error en updateProductService:", error);
        throw new Error("No se pudo actualizar el producto");
    }
}; 



// 5. ELIMINAR (DELETE)
export const deleteProductService = async (id) => {
    try {
        const idString = String(id).trim();
        
        // INTERRUPTOR: Si parece un ID largo de Firebase, buscamos directo por documento
        // Los IDs de Firebase suelen ser alfanuméricos largos (ej: más de 15 caracteres) o contener letras
        const esIdFirestore = isNaN(Number(idString)) || idString.length > 10;

        if (esIdFirestore) {
            // RUTA A: Buscar por el ID real del documento en Firestore
            const docRef = doc(db, "productos", idString);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const datos = docSnap.data();
                const productoEliminado = { 
                    id: datos.id || idString, 
                    ...datos 
                };
                await deleteDoc(docRef);
                return productoEliminado;
            }
        }

        // RUTA B: Si no se encontró por ID de documento o es un número puro, buscamos por campo interno
        const idNumero = Number(idString);
        if (!isNaN(idNumero)) {
            const q = query(productosRef, where("id", "==", idNumero));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const docRef = doc(db, "productos", docSnap.id);
                const productoEliminado = { 
                    id: idNumero, 
                    ...docSnap.data() 
                };
                await deleteDoc(docRef);
                return productoEliminado;
            }
        }

        // Si no coincidió con ninguna de las dos búsquedas
        return null;

    } catch (error) {
        console.error("Error en deleteProductService:", error);
        throw new Error("No se pudo eliminar el producto");
    }
};
