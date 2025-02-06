
import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { obtenerPokemonAleatorio } from '../../services/api';
import '../../App.css';

function Juego() {
    // Estados del juego
    const [pokemonActual, setPokemonActual] = useState(null);
    const [intento, setIntento] = useState('');
    const [feedback, setFeedback] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);
    const [errores, setErrores] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(60); // tiempo en segundos
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [mensajeError, setMensajeError] = useState(''); // Para errores en cargar Pokémon

    // Límite de errores permitidos
    const erroresPermitidos = 3;

    // Función para reiniciar el juego sin recargar la página
    const reiniciarJuego = () => {
        setPokemonActual(null);
        setIntento('');
        setFeedback('');
        setPuntuacion(0);
        setErrores(0);
        setTiempoRestante(60);
        setJuegoTerminado(false);
        cargarPokemonAleatorio();
    };

    // Cargar un Pokémon aleatorio
    const cargarPokemonAleatorio = async () => {
        try {
            setMensajeError('');
            const poke = await obtenerPokemonAleatorio();
            setPokemonActual(poke);
            setIntento('');
            setFeedback('');
        } catch (error) {
            console.error("Error al cargar el Pokémon:", error);
            // Mostrar mensaje amigable
            setMensajeError("No se pudo cargar el Pokémon. Por favor, intenta de nuevo.");
        }
    };

    // Efecto para cargar el primer Pokémon y reiniciar el juego
    useEffect(() => {
        reiniciarJuego();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Efecto para el contador de tiempo
    useEffect(() => {
        if (juegoTerminado) return; // No seguir contando si el juego terminó

        if (tiempoRestante <= 0) {
            terminarJuego("¡Se acabó el tiempo!");
            return;
        }

        const timer = setInterval(() => {
            setTiempoRestante(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [tiempoRestante, juegoTerminado]);

    // Función para guardar la puntuación en Firestore
    const guardarPuntuacion = async () => {
        const usuario = auth.currentUser;
        if (!usuario) return;
        try {
            await addDoc(collection(db, "ranking"), {
                usuario: usuario.email,
                puntuacion: puntuacion,
                fecha: serverTimestamp()
            });
            console.log("Puntuación guardada correctamente");
        } catch (error) {
            console.error("Error al guardar la puntuación:", error);
            // Opcional: podrías actualizar el feedback o mostrar un modal para avisar del error
        }
    };

    // Función para finalizar el juego
    const terminarJuego = (mensajeFinal) => {
        setJuegoTerminado(true);
        setFeedback(mensajeFinal);
        guardarPuntuacion();
    };

    // Función para verificar la respuesta del usuario
    const verificarRespuesta = () => {
        if (!pokemonActual) return;

        // Comprobamos si el intento es correcto
        if (intento.trim().toLowerCase() === pokemonActual.name.toLowerCase()) {
            setFeedback("¡Correcto!");
            setPuntuacion(prev => prev + 10);
            cargarPokemonAleatorio();
        } else {
            // Respuesta incorrecta
            setFeedback(`Inténtalo de nuevo. La respuesta era: ${pokemonActual.name}`);
            setErrores(prev => prev + 1);
            // Si se alcanza el límite de errores, finalizar el juego
            if (errores + 1 >= erroresPermitidos) {
                terminarJuego("Has alcanzado el máximo de errores.");
            }
        }
    };

    // Si el juego ha terminado, mostrar mensaje final y opción de reiniciar
    if (juegoTerminado) {
        return (
            <div className="juego-container">
                <h2>Juego Terminado</h2>
                <p>{feedback}</p>
                <p>Puntuación final: {puntuacion}</p>
                <button className="boton primary" onClick={reiniciarJuego}>
                    Reiniciar Juego
                </button>
            </div>
        );
    }

    // Interfaz del juego
    return (
        <div className="juego-container">
            <h2>Juego: Adivina el Pokémon</h2>
            <p>Tiempo restante: {tiempoRestante}s</p>
            <p>Errores: {errores} / {erroresPermitidos}</p>
            {mensajeError && <p className="error">{mensajeError}</p>}
            {pokemonActual && (
                <div className="pokemon-info">
                    <img
                        src={pokemonActual.image}
                        alt="Imagen del Pokémon"
                        style={{
                            filter: feedback === "" ? "brightness(0)" : "none",
                            width: "200px"
                        }}
                    />
                </div>
            )}
            <input
                type="text"
                value={intento}
                onChange={(e) => setIntento(e.target.value)}
                placeholder="Escribe el nombre"
            />
            <button className="boton primary" onClick={verificarRespuesta}>
                Comprobar
            </button>
            <p>{feedback}</p>
            <button className="boton secondary" onClick={cargarPokemonAleatorio}>
                Otro Pokémon
            </button>
        </div>
    );
}

export default Juego;
