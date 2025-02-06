// src/components/juego/Ranking.jsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../App.css';

// Configuramos el elemento raíz para el modal (para accesibilidad)
Modal.setAppElement('#root');

const Ranking = ({ isOpen, onRequestClose }) => {
    const [listaRanking, setListaRanking] = useState([]);

    useEffect(() => {
        const obtenerRanking = async () => {
            try {
                // Creamos una consulta a la colección "ranking" ordenada por puntuación descendente
                const consulta = query(
                    collection(db, "ranking"),
                    orderBy("puntuacion", "desc")
                );
                const snapshot = await getDocs(consulta);

                const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListaRanking(datos);
            } catch (error) {
                console.error("Error al obtener el ranking:", error);
            }
        };

        // Solo obtenemos el ranking si el modal está abierto
        if (isOpen) {
            obtenerRanking();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Ranking de Puntuaciones"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Ranking de Puntuaciones</h2>
            <ul className="ranking-list">
                {listaRanking.map((item, index) => (
                    <li key={item.id}>
                        {index + 1}. {item.usuario}: {item.puntuacion} puntos
                    </li>
                ))}
            </ul>
            <button className="boton secondary" onClick={onRequestClose}>
                Cerrar
            </button>
        </Modal>
    );
};

export default Ranking;
