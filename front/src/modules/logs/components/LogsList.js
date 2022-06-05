import { Log } from "./Log"

export const LogsList = ({ logs }) => {
    return (
        <div className="container">
            <div className="h-100 pb-4">
                <div className="row">
                    {logs.map(log => <Log key={log.id} log={log} />)}
                </div>
            </div>
        </div>
    )
}