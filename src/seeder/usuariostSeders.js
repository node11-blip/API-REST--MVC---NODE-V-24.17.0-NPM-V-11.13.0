

import { db } from '../config/firebase.js';
import { collection, addDoc } from "firebase/firestore";

// 1. Cambiado de 'products' a 'users' por coherencia de datos
const users = [
    { email: "ale@yahoo.com", password: "ca7/653%fda" },
    { email: "juan@gmail.com", password: "ca7/653%" }
];

async function uploadUsuarios() {
    if (!db) {
        console.error("❌ Error: La base de datos 'db' no se importó correctamente.");
        return;
    }

    try {

        const usersCollection = collection(db, "usuarios");
        
        // Optimización: Promise.all sube los objetos en paralelo en vez de uno por uno
        const uploadPromises = users.map(user => addDoc(usersCollection, user));
        await Promise.all(uploadPromises);
           
        console.log("🚀 ¡Todos los usuarios se cargaron correctamente!");
    } catch (error) {
        console.error("❌ Error al subir los usuarios:", error);
    }
}

// Ejecutar la función
uploadUsuarios();
