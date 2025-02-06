import React, { useState } from 'react';
import { obtenerDetallePokemon } from '../services/api';
import '../App.css';

const TarjetaPokemon = ({ pokemon }) => {
    const [volteada, setVolteada] = useState(false);
    const [detalles, setDetalles] = useState(null);

    // Función para girar la tarjeta y cargar detalles si es necesario
    const manejarGiro = async (e) => {
        e.stopPropagation();
        // Si no está volteada y aún no tenemos detalles, los cargamos
        if (!volteada && !detalles) {
            try {
                const data = await obtenerDetallePokemon(pokemon.id);
                console.log("Detalles obtenidos:", data);
                setDetalles(data);
            } catch (error) {
                console.error("Error al obtener detalles del Pokémon:", error);
            }
        }
        // Alterna el estado
        setVolteada(prev => !prev);
    };

    return (
        <div className="card-container">
            <div className={`card ${volteada ? 'flip' : ''}`}>
                {/* Cara frontal */}
                <div className="card-face card-front">
                    <img src={pokemon.image} alt={pokemon.name} className="image" />
                    <h3 className="name">{pokemon.name}</h3>
                    <button className="link" onClick={manejarGiro}>
                        {volteada ? "Volver" : "Saber más"}
                    </button>
                </div>
                {/* Cara trasera */}
                <div className="card-face card-back">
                    {detalles ? (
                        <>
                            <img src={detalles.sprites.front_default} alt={detalles.name} className="image" />
                            <h3 className="name">{detalles.name}</h3>
                            <p>Altura: {detalles.height ? detalles.height : "N/A"}</p>
                            <p>Peso: {detalles.weight ? detalles.weight : "N/A"}</p>
                            <p>
                                Tipos: {detalles.types ? detalles.types.map(t => t.type.name).join(', ') : "N/A"}
                            </p>
                        </>
                    ) : (
                        <p>Cargando detalles...</p>
                    )}
                    <button className="link" onClick={manejarGiro}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaPokemon;
