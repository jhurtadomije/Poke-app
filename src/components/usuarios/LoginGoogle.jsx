
import React from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const LoginGoogle = () => {
    const navigate = useNavigate();
    const iniciarSesionConGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };

    return (
        <button className="boton primary" onClick={iniciarSesionConGoogle} aria-label="Iniciar sesión con Google">
            Iniciar sesión con Google
        </button>
    );
};

export default LoginGoogle;
