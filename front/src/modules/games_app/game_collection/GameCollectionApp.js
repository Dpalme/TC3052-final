/*
Genere  un  nuevo  componente  llamado  GameCollectionApp.js  el  cual  debe mostrar  los 
componentes de GameCollection y GameCollectionAdd, y debe implementar el uso de reducer y los 
hooks que considere necesarios.  
La información de los videojuegos debe persistirse en el local storage del navegador.

games should be stored in local storage
*/

import { useEffect, useState } from "react";
import { useBack } from "../../../hooks/useBack";
import { GameCollection } from "./components/GameCollection";
import { GameCollectionAdd } from "./components/GameCollectionAdd";
import { GameCollectionSearch } from "./components/GameCollectionSearch";

export const GameCollectionApp = ({ dispatch }) => {
    const [filter, setFilter] = useState("")
    const { isLoading, error, fetchData } = useBack();

    const [filteredGames, setGames] = useState([]);

    useEffect(() => {
        fetchData(`/collections`, "GET", {}, {gameName:filter.toUpperCase()})
            .then(res => {
                setGames(res);
            })
    }, [filter, fetchData]);


    return (
        <div className="container">
            <div className="h-100 pb-4">
                <GameCollectionAdd
                    dispatch={dispatch}
                />

                <GameCollectionSearch
                    setFilter={setFilter}
                />
                {error && <p>Error... {error}</p>}
                {isLoading && <div className="spinner-border" role="status"></div>}
                {!isLoading && !error && <GameCollection games={filteredGames} dispatch={dispatch} />}
            </div>
        </div>
    )
}