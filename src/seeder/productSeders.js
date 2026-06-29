import { db } from '../config/firebase.js';
import { collection, addDoc } from "firebase/firestore";

const products = [
    { id: 1, name: "Teléfono", price: 300, modelo: "Azul", category: "Electrónica" },
    { id: 2, name: "Televisor", price: 500, modelo: "Negro", category: "Electrónica" },
    { id: 3, name: "Radio", price: 50, modelo: "Gris", category: "Electrónica" },
    { id: 4, name: "Auriculares", price: 80, modelo: "Blanco", category: "Audio" },
    { id: 5, name: "Microondas", price: 150, modelo: "Plata", category: "Hogar" },
    { id: 6, name: "Licuadora", price: 70, modelo: "Rojo", category: "Hogar" },
    { id: 7, name: "Laptop", price: 900, modelo: "Gris", category: "Computación" },
    { id: 8, name: "Teclado", price: 40, modelo: "Negro", category: "Computación" },
    { id: 9, name: "Mouse", price: 25, modelo: "Negro", category: "Computación" },
    { id: 10, name: "Reloj Inteligente", price: 120, modelo: "Rosa", category: "Electrónica" }
];

async function uploadProducts() {
    // Validación de seguridad para confirmar que db no sea undefined
    if (!db) {
        console.error("❌ Error: La base de datos 'db' no se importó correctamente.");
        return;
    }

    try {
        const productsCollection = collection(db, "productos");
        
        for (const product of products) {
            // Pasamos el objeto 'product' completo para que incluya el id (1, 2, 3...)
            await addDoc(productsCollection, product);
            console.log(`✅ Producto "${product.name}" (ID: ${product.id}) subido con éxito.`);
        }
        console.log("🚀 ¡Todos los productos se cargaron correctamente!");
    } catch (error) {
        console.error("❌ Error al subir los productos:", error);
    }
}

// Ejecutar la función
uploadProducts();

