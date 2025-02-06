import React from 'react';
import errorImagen from '../assets/error.png';
import '../App.css';
import {Link} from "react-router-dom";

const NoEncontrado = () => {
    return (
        <main className="no-encontrado">
            <img
                src={errorImagen}
                alt="Página no encontrada"
                className="imagen-error"
            />
            <h2>Error 404</h2>
            <p>La página que buscas no existe.</p>
            <Link to="/" className="boton primary">Volver al inicio</Link>
        </main>
    );
};

export default NoEncontrado;