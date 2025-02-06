import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetallePokemon } from '../services/api';
import '../App.css';

function PokemonDetalle() {
    const { idPokemon } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const datos = await obtenerDetallePokemon(idPokemon);
                console.log("Detalle del Pokémon:", datos);
                setPokemon(datos);
            } catch (error) {
                console.error('Error al obtener los detalles del Pokémon:', error);
            }
        })();
    }, [idPokemon]);

    if (!pokemon) return <p>Cargando...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height ? pokemon.height : "N/A"}</p>
            <p>Peso: {pokemon.weight ? pokemon.weight : "N/A"}</p>
            <p>
                Tipos: {pokemon.types ? pokemon.types.map(t => t.type.name).join(', ') : "N/A"}
            </p>
        </div>
    );
}

export default PokemonDetalle;
