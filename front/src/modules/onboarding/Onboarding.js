import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/authProvider';

export const Onboarding = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        const error = await auth.login(username, password);
        if (error)
            return setError('ERROR: ' + error);
        setError('');
        setLoading(false);
        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'user':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4"></hr>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="user">User</label>
                        <input type="text" className="form-control" id="user" onChange={handleChange} name="user" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" onChange={handleChange} name="password" />
                    </div>
                    {<button type="submit" className="btn btn-primary mr-4">{loading ? "Loading..." : "Login"}</button>}
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
                </form>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    )
}