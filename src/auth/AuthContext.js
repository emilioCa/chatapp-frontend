import React, { useCallback, useState, createContext } from 'react'
import { fetchWithoutToken } from '../helpers/fetch';

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);

    const login = async (email, password) => {
        const response = await fetchWithoutToken('/auth/', { email, password }, 'POST');

        if (response.ok) {
            localStorage.setItem('token', response.token);
            const { user } = response;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }

        return response.ok;
    }
    const logout = () => { }

    const register = async (name, email, password) => {
        const response = await fetchWithoutToken('/auth/new', { name, email, password }, 'POST');

        if (response.ok) {
            localStorage.setItem('token', response.token);
            const { user } = response;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }

        return response.ok;
    }
    const verifyToken = useCallback(() => { }, []);

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verifyToken,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;