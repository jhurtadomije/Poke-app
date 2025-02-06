
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginGoogle from './usuarios/LoginGoogle'; // componente para login con Google
import '../App.css';

const Header = () => {
    const [usuario] = useAuthState(auth);

    const cerrarSesion = async () => {
        await auth.signOut();
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="link">Inicio</Link>
                <Link to="/pokemons" className="link">Pokémons</Link>
                {usuario ? (
                    <>
                        <Link to="/jugar" className="link">Jugar</Link>
                        <button className="link cerrar-sesion" onClick={cerrarSesion} aria-label="Cerrar sesión">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="link">Iniciar Sesión</Link>
                        <Link to="/registro" className="link">Registro</Link>
                        <LoginGoogle />
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
