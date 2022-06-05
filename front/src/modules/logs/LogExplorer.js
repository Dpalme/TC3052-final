import { useEffect, useState } from "react";
import { useBack } from "../../hooks/useBack";
import { LogsList } from "./components/LogsList";

export const LogExplorer = () => {
    const { isLoading, error, fetchData } = useBack();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchData("/logs/", "GET")
            .then(res => {
                setLogs(res);
            })
    }, [fetchData]);

    return (
        <div className="container">
            <div className="link-dark text-decoration-none border-bottom pb-2 pt-4 mb-2">
                <h1 className="display-4">Logs</h1>
            </div>
            <div className="h-100 pb-4">
                {error && <p>Error... {error}</p>}
                {isLoading && <div className="spinner-border" role="status"></div>}
                {!isLoading && !error && <LogsList logs={logs} />}
            </div>
        </div>
    )
}
