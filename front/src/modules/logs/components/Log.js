
export const Log = ({ log }) => {
    /*
    username
    date
    event
    */
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{log.username}</h5>
                <p className="card-title">{log.date}</p>
                <p className="card-text">{log.event}</p>
            </div>
        </div>
    )
}