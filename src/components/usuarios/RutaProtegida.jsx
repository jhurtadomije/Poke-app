
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const RutaProtegida = ({ children }) => {
    const [usuario, cargando] = useAuthState(auth);

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        // Si no hay usuario, redirige a la página de login
        return <Navigate to="/login" />;
    }

    return children;
};

export default RutaProtegida;
