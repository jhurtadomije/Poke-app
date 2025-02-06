
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import logo from '../assets/logoPokemon.png';
import Ranking from './juego/Ranking';
import '../App.css';

const LandingPage = () => {
    // Obtenemos el usuario actual a través del hook de autenticación
    const [usuario] = useAuthState(auth);
    // Estado para controlar si el modal del ranking está abierto
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div className="landing-container">
            {/* Logo principal */}
            <img src={logo} alt="Logo Pokémon" className="logo" />

            {/* Si el usuario está autenticado, se muestra su correo */}
            {usuario && (
                <p className="usuario-nombre">Bienvenido, {usuario.email}</p>
            )}

            {/* Botón para mostrar el ranking */}
            <button
                className="boton secondary ranking-button"
                onClick={() => setModalAbierto(true)}
                aria-label="Ver ranking de puntuaciones"
            >
                Ver Ranking
            </button>

            {/* Modal de ranking */}
            <Ranking isOpen={modalAbierto} onRequestClose={() => setModalAbierto(false)} />

            {/* Título y descripción de la aplicación */}
            <h1>¡Bienvenido a la Pokémon App!</h1>
            <p>
                Explora todos los Pokémon disponibles gracias a la PokeAPI. Regístrate o inicia sesión para poner a prueba tus conocimientos con nuestro divertido juego.
            </p>

        </div>
    );
};

export default LandingPage;
