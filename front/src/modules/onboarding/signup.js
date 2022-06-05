import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBack } from '../../hooks/useBack';
import { useAuth } from '../../providers/authProvider';

export const SignUp = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const { isLoading, error: backError, fetchData, resetError } = useBack();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm)
            return setError('Passwords do not match');
        setError('');
        try {
            resetError();
            fetchData('/users', "POST",
                { email, username, password })
                .then(res => {
                    auth.login(username, password);
                    navigate('/');
                }).catch(err => {
                    throw new Error(err);
                })
        }
        catch (err) {
            setError(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'user':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'passwordConf':
                setPasswordConfirm(value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (auth.user)
            navigate('/');
    }, [auth, navigate]);

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Sign up!</h1>
                <p className="lead">De que crea tu cuenta y así</p>
                <hr className="my-4"></hr>

                <form onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label htmlFor="user">Username</label>
                        <input type="text" className="form-control" onInput={handleChange} id="user" name="user" required="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" onInput={handleChange} id="email" name="email" required="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onInput={handleChange} id="password" name="password" required="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConf">Confirm Password</label>
                        <input type="password" className="form-control" onInput={handleChange} id="passwordConf" name="passwordConf" required="" />
                    </div>
                    {isLoading && <div className="spinner-border text-primary" role="status"></div>}
                    {!isLoading && <button type="submit" className="btn btn-primary mr-4">Signup</button>}
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                </form>
                {backError && <p className="text-danger">{backError}</p>}
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <p className="text-info">Loading...</p>}
            </div>
        </div>
    )
}