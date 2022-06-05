import { useEffect, useState } from 'react';
import { useBack } from '../../../hooks/useBack';
import { AgregaGenero } from './components/AgregaGenero';
import { ResultadoVideojuegos } from './components/ResultadoVideojuegos';


export const VideojuegosApp = ({dispatch}) => {
    const [generos, setGeneros] = useState(['action']);
    const [collection, setCollection] = useState([]);
    const { fetchData } = useBack();

    const agregaGenero = (nuevoGenero) => {
        setGeneros(estadoActualGeneros => [...estadoActualGeneros, nuevoGenero]);
    }

    useEffect(() => {
        fetchData('/collections', 'GET')
        .then(res => {
            setCollection(res);
        })
    }, [fetchData]);

    return (
        <div className='container'>
            <div className="link-dark text-decoration-none border-bottom pb-2 pt-4 mb-2">
                <h1 className="display-4">Practica Hooks</h1>
                <AgregaGenero setGeneros={agregaGenero} />
            </div>

            <div>
                <ol className="list-group list-group-flush border-bottom scrollarea">
                    {
                        generos.map(genero => {
                            return <ResultadoVideojuegos
                                key={genero}
                                genero={genero}
                                dispatch={dispatch}
                                collection={collection}
                            />
                        })
                    }
                </ol>
            </div>
        </div>
    )
} 