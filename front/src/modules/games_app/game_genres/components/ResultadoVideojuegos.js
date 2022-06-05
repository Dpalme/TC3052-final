/*
Sebastian Morales A01376228
Diego Palmerin A01747290
*/

import React from 'react';
import { InfoVideojuego } from './InfoVideojuego.js';
import { useFetch } from "../../../../hooks/useFetch";


export const ResultadoVideojuegos = ({ genero, dispatch, collection }) => {
    const { data: infoJuegos, loading, error } = useFetch(`/games?genres=${encodeURI(genero)}`);
    const isSaved = (id) => {
        if (loading || error !== null) {
            return false;
        }
        return collection && collection.some(juego => juego.id === id);
    }

    return (
        <>
            <h3 className="card-title">{genero}</h3>
            {loading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                </div>
                <span className="sr-only">Loading...</span>
            </div>}
            {error && <div className="alert alert-danger" role="alert">
                {error.toString()}
            </div>}
            {!loading && !error && <div className="list-group d-flex flex-row flex-wrap">
                {
                    infoJuegos ? infoJuegos?.results.map((juego) => (
                        <InfoVideojuego
                            isSaved={isSaved(juego.id)}
                            key={juego.id}
                            juego={{...juego, dispatch}}/>
                    )) : <span className="d-flex justify-content-center">
                        <span className="spinner-border" role="status">
                        </span>
                        <span className="sr-only">Loading...</span>
                    </span>
                }
            </div>}
        </>
    )
}

