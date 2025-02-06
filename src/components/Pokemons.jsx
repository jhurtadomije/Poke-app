// src/components/Pokemons.jsx
import React, { useEffect, useState } from 'react';
import { obtenerPokemons } from '../services/api';
import TarjetaPokemon from './TarjetaPokemon';
import '../App.css';

function Pokemons() {
    const [listaPokemons, setListaPokemons] = useState([]);
    const [desplazamiento, setDesplazamiento] = useState(0);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const cargarPokemons = async () => {
            setCargando(true);
            try {
                const datos = await obtenerPokemons(desplazamiento, 8);
                console.log('Pokémon obtenidos:', datos.map(p => p.id));
                setListaPokemons(prev => {
                    const idsPrevios = new Set(prev.map(p => p.id));
                    const nuevosPokemons = datos.filter(p => !idsPrevios.has(p.id));
                    console.log('Pokémon antes de fusionar:', prev.map(p => p.id));
                    console.log('Pokémon nuevos (sin duplicados):', nuevosPokemons.map(p => p.id));
                    return [...prev, ...nuevosPokemons];
                });
            } catch (error) {
                console.error('Error al cargar Pokémon:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarPokemons();
    }, [desplazamiento]);

    const cargarMas = () => {
        setDesplazamiento(prev => prev + 8);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Listado de Pokémon</h2>
            <div className="list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {listaPokemons.map((pokemon) => (
                    <TarjetaPokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
            <button className="loadMoreButton" onClick={cargarMas} disabled={cargando}>
                {cargando ? 'Cargando...' : 'Obtener más'}
            </button>
        </div>
    );
}

export default Pokemons;
