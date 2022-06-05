import { useState } from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { VideojuegosApp } from './game_genres/VideojuegosApp';
import { GameCollectionApp } from './game_collection/GameCollectionApp';
import { LogExplorer } from '../logs/LogExplorer';

export const GamesApp = () => {
    const [message, setMessage] = useState(null);


    const dispatch = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 4000);
    };

    return (
        <div>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path="/logs" element={
                        <LogExplorer />
                    } />
                    <Route exact path="/coleccion" element={
                        <GameCollectionApp dispatch={dispatch} />
                    } />
                    <Route path="*" element={
                        <VideojuegosApp dispatch={dispatch} />
                    } />
                </Routes>
            </div>
            {message && <div className="fixed-bottom alert alert-light mb-0" style={{ 'zIndex': 99 }}>{message.toString()}</div>}
        </div>
    );

}