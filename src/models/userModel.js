import { db } from "../config/firebase.js"; 
import { 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc,
    query,       // Importado para el login
    where        // Importado para el login
} from "firebase/firestore";

// Apuntamos a la colección de usuarios
const usuariosRef = collection(db, "usuarios");
const limpiarTexto = (texto) => texto.trim().toLowerCase();

// 🔑 NUEVO: AUTENTICACIÓN (LOGIN)
export const loginUsuarioService = async (email, password) => {
    try {
        // Buscamos directamente en Firestore un documento que coincida con el email
        const q = query(usuariosRef, where("email", "==", email.trim()));
        const querySnapshot = await getDocs(q);

        // Si no encuentra ningún usuario con ese correo
        if (querySnapshot.empty) {
            return { OK: false, mensaje: "Credenciales inválidas" };
        }

        // Tomamos el primer usuario encontrado
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Validamos si la contraseña coincide
        if (userData.password !== password) {
            return { OK: false, mensaje: "Credenciales inválidas" };
        }

        // Si coincide, retornamos éxito junto con los datos públicos del usuario
        return {
            OK: true,
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: userDoc.id,
                email: userData.email
            }
        };
    } catch (error) {
        console.error("❌ Error en loginUsuarioService:", error);
        throw new Error("Error interno al intentar iniciar sesión");
    }
};

// 1. OBTENER Y FILTRAR USUARIOS
export const getUsuariosService = async (email) => {
    try {
        const snapshot = await getDocs(usuariosRef);
        let usuariosFiltrados = [];
        
        snapshot.forEach(doc => {
            usuariosFiltrados.push({ id: doc.id, ...doc.data() });
        });
        
        if (email) {
            usuariosFiltrados = usuariosFiltrados.filter(u => 
                u.email && limpiarTexto(u.email).includes(limpiarTexto(email))
            );
        }
        
        return {
            mensaje: email ? "USUARIOS FILTRADOS" : "TODOS LOS USUARIOS",
            cantidad: usuariosFiltrados.length,
            usuarios: usuariosFiltrados
        };
    } catch (error) {
        console.error("❌ Error en getUsuariosService:", error);
        throw new Error("No se pudieron obtener los usuarios");
    }
};

// 2. BUSCAR USUARIO POR ID
export const getUsuarioByIdService = async (id) => {
    try {
        const idString = String(id).trim();
        const docRef = doc(db, "usuarios", idString);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) return null;
        
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error("❌ Error en getUsuarioByIdService:", error);
        throw new Error("Error al buscar el usuario por ID");
    }
};

// 3. CREAR NUEVO USUARIO
export const createUsuariosService = async (email, password) => {
    try {
        const nuevoUsuario = {
            email: email,
            password: password
        };
        
        const docRef = await addDoc(usuariosRef, nuevoUsuario);
        
        return {
            id: docRef.id,
            ...nuevoUsuario
        };
    } catch (error) {
        console.error("❌ Error en createUsuariosService:", error);
        throw new Error("No se pudo crear el usuario");
    }
};

// 4. ACTUALIZAR USUARIO
export const updateUsuarioService = async (id, updateData) => {
    try {
        const idString = String(id).trim();
        const docRef = doc(db, "usuarios", idString);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) return null;
        
        const datosActualizar = {};
        if (updateData.email !== undefined) datosActualizar.email = updateData.email;
        if (updateData.password !== undefined) datosActualizar.password = updateData.password;
        
        await updateDoc(docRef, datosActualizar);
        
        return {
            id: idString,
            ...docSnap.data(),
            ...datosActualizar
        };
    } catch (error) {
        console.error("❌ Error en updateUsuarioService:", error);
        throw new Error("No se pudo actualizar el usuario");
    }
}; 

// 5. ELIMINAR USUARIO
export const deleteUsuarioService = async (id) => {
    try {
        const idString = String(id).trim();
        const docRef = doc(db, "usuarios", idString);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) return null;
        
        const usuarioEliminado = { 
            id: docSnap.id, 
            ...docSnap.data() 
        };
        
        await deleteDoc(docRef);
        return usuarioEliminado;

    } catch (error) {
        console.error("❌ Error en deleteUsuarioService:", error);
        throw new Error("No se pudo eliminar el usuario");
    }
};
