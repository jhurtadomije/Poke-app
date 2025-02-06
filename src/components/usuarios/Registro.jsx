
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../../App.css';

const Registro = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, correo, contraseña);
            navigate('/'); // Redirige a la landing page
        } catch (err) {
            // Mapeo de errores para mensajes amigables
            if (err.code === 'auth/weak-password') {
                setError("La contraseña es demasiado débil. Intenta con una contraseña más segura.");
            } else if (err.code === 'auth/invalid-email') {
                setError("El correo electrónico no es válido.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Este correo ya está en uso. Por favor, intenta con otro.");
            } else {
                setError("Ocurrió un error durante el registro. Inténtalo de nuevo más tarde.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Registro</h2>
            <form onSubmit={manejarRegistro}>
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
                    Registrarse
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Registro;
