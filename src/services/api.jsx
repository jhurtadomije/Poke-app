const URL_BASE = 'https://pokeapi.co/api/v2';

// Obtiene una lista de Pokémon (con id e imagen)
export async function obtenerPokemons(desplazamiento = 0, limite = 8) {
    const respuesta = await fetch(`${URL_BASE}/pokemon?offset=${desplazamiento}&limit=${limite}`);
    const datos = await respuesta.json();
    return datos.results.map((item) => {
        const id = item.url.split('/').filter(Boolean).pop();
        return {
            id,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
    });
}

// Obtiene el detalle de un Pokémon por su ID o nombre
export async function obtenerDetallePokemon(id) {
    const respuesta = await fetch(`${URL_BASE}/pokemon/${id}`);
    if (!respuesta.ok) throw new Error('Error al obtener el detalle');
    const datos = await respuesta.json();
    return datos;
}

// Obtiene un Pokémon aleatorio (primer generación, IDs 1-151)
export async function obtenerPokemonAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 151) + 1;
    const respuesta = await fetch(`${URL_BASE}/pokemon/${idAleatorio}`);
    const datos = await respuesta.json();
    return {
        name: datos.name,
        image: datos.sprites.front_default
    };
}
