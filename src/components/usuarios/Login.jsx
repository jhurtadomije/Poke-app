
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../../App.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, correo, contraseña);
            navigate('/'); // Redirige a la landing page
        } catch (err) {
            // Mapeo de errores para mensajes amigables
            if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                setError("Correo o contraseña incorrectos.");
            } else {
                setError("Ocurrió un error al iniciar sesión. Intenta de nuevo más tarde.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={manejarLogin}>
                <label htmlFor="correo">Correo electrónico:</label>
                <input
                    id="correo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <label htmlFor="contraseña">Contraseña:</label>
                <input
                    id="contraseña"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit" className="boton primary">
                    Entrar
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
