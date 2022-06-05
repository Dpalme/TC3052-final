import React, {
    useContext,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useBack } from '../hooks/useBack';

const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    const { fetchData, error, isLoading } = useBack();

    const Login = async (username, password) => {
        const res = await fetchData('/users/login', "POST", { username, password })
        if (!isLoading && error) {
            return error
        }
        
        if (res) {
            localStorage.setItem('user', JSON.stringify(res))
            changeUser({ user: res, login: Login, logout: Logout })
            return null
        }
    };

    const Logout = async () => {
        fetchData('/users/logout', "POST")
        .then(_ => {
            localStorage.removeItem('user')
            changeUser({ user: null, login: Login, logout: Logout })
        }).catch(err => {
            throw new Error(err);
        })
    };



    const [user, changeUser] = useState({
        user: JSON.parse(localStorage.getItem('user')) || null,
        login: Login,
        logout: Logout,
    });

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}


AuthProvider.propTypes = {
    children: PropTypes.node,
};

export function useAuth() {
    return useContext(AuthContext);
}
