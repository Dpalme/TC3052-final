/* Genere un nuevo componente llamado GameCollectionItem.js el cual debe tener la 
información del videojuego mostrada en un componente Card de Bootstrap y debe tener un botón 
para eliminarlo de la lista de juegos. El Card debe mostrar como mínimo una imagen del videojuego, 
su nombre, y su rating de metacritic. */

import { useState } from 'react';
import { useBack } from "../../../../hooks/useBack";
import { useFetch } from "../../../../hooks/useFetch";

export const GameCollectionItem = ({ game, dispatch }) => {
    const { loading, error, data: juego } = useFetch(`/games/${game.rawgId}`);
    const { isLoading, error: backError, fetchData, resetError } = useBack();
    const [deleted, setDeleted] = useState(false);


    const OnClick = async () => {
        resetError();
        fetchData(`/collections/`, 'DELETE', { rawgId: juego.id })
            .then(res => {
                dispatch(`Removed game ${juego.id} from collection`);
                setDeleted(true);
            }).catch(err => {
                dispatch(err);
            })
    }

    return (
        <>
            {loading && <div className="spinner-border" role="status"></div>}
            {error && <p>Error... {error.toString()}</p>}
            {!deleted && !loading && !error && juego && <li className="list-group-item col-4">
                <div>
                    <img src={juego.background_image} alt={juego.name} className="card-img-top"></img>
                    <div className='card-body'>
                        <h3>{juego.name}</h3>
                        <p>rating: {juego.rating} - metacritic: {juego.metacritic}</p>
                        <p>ID: {juego.id}</p>
                        {isLoading && <button className="btn btn-primary" value="Loading..." disabled />}
                        {!isLoading && <button type="button" className="btn btn-danger" onClick={OnClick}>&times;</button>}
                        {backError && <p>Error... {backError.toString()}</p>}
                    </div>
                </div>
            </li>}
        </>
    )
}