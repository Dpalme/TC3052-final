export const GameCollectionSearch = ({ setFilter }) => {

    const handleChange = (e) => {
        setFilter(e.target.value);
    }
    
    return (
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleChange}
            />
        </div>
    )
}