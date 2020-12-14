import React, { useCallback, useState, createContext } from 'react'
import { useSnackbar } from 'react-simple-snackbar';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';

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
    const [openSnack] = useSnackbar();

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

            openSnack(`¡Bienvenido ${user.name}!`)
        } else {
            openSnack(response.msg);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });
    }

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

            openSnack(`Usuario registrado. ¡Bienvenido ${user.name}!`);
        } else {
            openSnack(response.msg);
        }
    }

    const verifyToken = useCallback(async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

        const resp = await fetchWithToken('/auth/renew');

        if (resp.ok) {
            localStorage.setItem('token', response.token);
            const { user } = response;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

    }, []);

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