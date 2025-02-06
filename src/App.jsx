// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Pokemons from './components/Pokemons';
import Juego from './components/juego/Juego';
import Ranking from './components/juego/Ranking';
import PokemonDetalle from './components/PokemonDetalle';
import NoEncontrado from './components/NoEncontrado';
import BotonSubir from './components/BotonSubir';
import Login from './components/usuarios/Login';
import Registro from './components/usuarios/Registro';
import RutaProtegida from './components/usuarios/RutaProtegida';
import './App.css';


function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/pokemons" element={<Pokemons />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route
                        path="/jugar"
                        element={
                            <RutaProtegida>
                                <Juego />
                            </RutaProtegida>
                        }
                    />
                    <Route path="/detalle/:idPokemon" element={<PokemonDetalle />} />
                    <Route path="*" element={<NoEncontrado />} />
                </Routes>
            </div>
            <BotonSubir />
        </Router>
    );
}

export default App;
