import { useState } from "react";
import { useBack } from "../../../../hooks/useBack";

export const GameCollectionAdd = ({ dispatch }) => {
    const [id, setId] = useState('');
    const { isLoading, error, fetchData, resetError } = useBack();

    const OnSubmit = (e) => {
        e.preventDefault();
        resetError();
        fetchData('/collections', "GET", { ragwId: id })
            .then(res => {
                setId('');
                dispatch({ message: `Added game ${id} to collection` });
            }).catch(err => {
                dispatch({ message: err });
            })
    };

    return (
        <div className="position-sticky pt-3">
            <h2>Game Collection</h2>
            <form className="mb-4" onSubmit={OnSubmit}>
                <div className="input-group mb-1">
                    <div className="input-group-prepend mb-2">
                        <label htmlFor="id">Game ID</label>
                        <input type="text" className="form-control" id="id" value={id} onChange={e => setId(e.target.value)} />
                    </div>
                </div>
                {isLoading && <div className="alert alert-info">Loading...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {!isLoading && <input type="submit" className="btn btn-primary" value="Add" />}
            </form>
        </div>
    )
}