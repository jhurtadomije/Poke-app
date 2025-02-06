
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7GVLY0HM1nsVJ6YSbYaRN1wrcJmdxW4Q",
    authDomain: "poke-app-77716.firebaseapp.com",
    projectId: "poke-app-77716",
    storageBucket: "poke-app-77716.firebasestorage.app",
    messagingSenderId: "282797292774",
    appId: "1:282797292774:web:be4a5354fc9439ade3cf27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Configurar el proveedor de Google
export const googleProvider = new GoogleAuthProvider();
