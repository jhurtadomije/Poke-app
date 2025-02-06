# Poke-App

Poke-App es una aplicación web de Pokémon desarrollada en React que permite explorar la lista de Pokémon, jugar un divertido juego de adivinanza y consultar un ranking de puntuaciones.

[![App en producción](https://img.shields.io/badge/Producción-En%20línea-green)](https://poke-app-77716.web.app)


## Características

- **Landing Page:**  
  Página de inicio con información estática sobre el proyecto, que incluye el logo de la app y un mensaje de bienvenida.  
- **Listado de Pokémon:**  
  Se muestra una lista de Pokémon obtenida de la PokéAPI. Cada tarjeta de Pokémon se puede girar para revelar detalles adicionales.
- **Juego Interactivo:**  
  Un juego basado en adivinar el nombre del Pokémon a partir de su imagen (la imagen se muestra en modo silueta hasta que el usuario acierta).  
  - Se establece un límite de tiempo y errores para aumentar la dificultad.
- **Ranking de Puntuaciones:**  
  Las puntuaciones obtenidas en el juego se almacenan en una base de datos en Firestore. Se muestra un modal con el ranking de puntuaciones, ordenado de mayor a menor, e incluye el correo o nombre del usuario.
- **Autenticación Multiusuario:**  
  Los usuarios pueden registrarse e iniciar sesión mediante correo y contraseña, o a través de Google.  
  - Si el usuario está autenticado, se muestra su información en la Landing Page y en el Header se actualizan las opciones (por ejemplo, se muestra un botón para cerrar sesión y desaparecen los enlaces de Iniciar Sesión y Registro).
- **Rutas protegidas:**  
  Algunas rutas (como el juego) solo son accesibles si el usuario está autenticado.  
- **Routing con parámetros:**  
  Los detalles de cada Pokémon se muestran en un componente específico utilizando rutas con parámetros (por ejemplo, `/detalle/:idPokemon`).

## Tecnologías y Herramientas

- **Framework:** React (creado con Vite)
- **Routing:** React Router
- **Autenticación y Base de Datos:** Firebase (Authentication y Firestore)
- **Estilos:** CSS modular utilizando variables CSS para mantener la coherencia visual.
- **Despliegue:** La aplicación está en producción a través de Firebase Hosting.
