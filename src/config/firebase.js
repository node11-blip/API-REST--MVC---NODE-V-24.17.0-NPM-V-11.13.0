import 'dotenv/config'; // Esto debe ir OBLIGATORIAMENTE en la primera línea
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configurar la ruta exacta hacia el archivo .env en la raíz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Modifica los ../ según la distancia a tu raíz

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Verificación de seguridad en consola para asegurar que Node cargó el archivo .env
if (!process.env.FIREBASE_PROJECT_ID) {
  console.error("❌ ERROR: No se pudieron cargar las variables de entorno. Revisa que tu archivo .env esté en la raíz del proyecto.");
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar base de datos
export const db = getFirestore(app);
