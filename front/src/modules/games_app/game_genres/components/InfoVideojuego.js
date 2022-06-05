/*
Sebastian Morales A01376228
Diego Palmerin A01747290
*/

import React, { useState } from "react";
import { useBack } from "../../../../hooks/useBack";

export const InfoVideojuego = ({ juego, isSaved }) => {
    const [saved, setIsSaved] = useState(isSaved);
    const { isLoading, error, fetchData, resetError } = useBack();

    const AddToCollection = async () => {
        resetError()
        fetchData(`/collections/`, "POST", { rawgId: juego.id, gameName: juego.name })
            .then(res => {
                setIsSaved(true);
                juego.dispatch(`${juego.name} was added to your collection`);
            }).catch(err => {
                juego.dispatch(`Error adding: ${juego.name} to your collection (${err})`);
            })
    }

    const RemoveFromCollection = async () => {
        resetError()
        fetchData(`/collections/`, 'DELETE', { rawgId: juego.id })
            .then(res => {
                setIsSaved(false);
                juego.dispatch(`${juego.name} was removed from your collection`);
            }).catch(err => {
                juego.dispatch(`Error removing: ${juego.name} from your collection (${err})`);
            })
    }

    return <li className="list-group-item col-4">
        <div>
            <img src={juego.background_image} alt={juego.nombre} className="card-img-top"></img>
            <div className='card-body'>
                <h3>{juego.name}</h3>
                <p>rating: {juego.rating} - metacritic: {juego.metacritic}</p>
                <p>ID: {juego.id}</p>
                {!saved && <button className="btn btn-primary" onClick={AddToCollection}>
                    {isLoading ? "Loading..." : "Add to collection"}
                </button>}
                {saved && <button className="btn btn-danger" onClick={RemoveFromCollection}>
                    {isLoading ? "Loading" : "Remove from collection"}
                </button>}
                {error && <div className="alert alert-danger" role="alert"> {error} </div>}
            </div>
        </div>
    </li>;
}