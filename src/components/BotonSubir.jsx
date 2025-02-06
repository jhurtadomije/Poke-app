import React, { useState, useEffect } from 'react';
import '../App.css';

const BotonSubir = () => {
    const [visible, setVisible] = useState(false);

    // Función que controla el scroll y muestra u oculta el botón arriba
    const manejarScroll = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    // Función para hacer scroll suave al inicio de la página
    const subirAlInicio = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', manejarScroll);
        return () => window.removeEventListener('scroll', manejarScroll);
    }, []);

    return (
        <>
            {visible && (
                <button className="boton-subir" onClick={subirAlInicio} aria-label="Subir">
                    {/* SVG de una flecha hacia arriba */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icono-flecha"
                    >
                        <line x1="12" y1="19" x2="12" y2="5"/>
                        <polyline points="5 12 12 5 19 12"/>
                    </svg>
                </button>
            )}
        </>
    );
};

export default BotonSubir;
