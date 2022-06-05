/* Genere un nuevo componente llamado GameCollection.js el cual debe mostrar todos los Cards 
de  los  juegos  que  el  usuario ha  agregado  a su  colección,  utilizando  la  clase  Flex  de  Bootstrap  para 
que se muestren de manera correcta y responsiva.  */

import { GameCollectionItem } from "./GameCollectionItem"

export const GameCollection = ({ games, dispatch }) => {

    return (
        <ul className="list-group d-flex flex-row flex-wrap">
            {games?.map((game, id) =>
                <GameCollectionItem key={id} game={game} dispatch={dispatch} />
            )}
        </ul>
    )
}