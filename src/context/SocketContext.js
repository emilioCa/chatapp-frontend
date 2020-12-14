import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import AuthContext from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, socketConnect, socketDisconnect } = useSocket(process.env.REACT_APP_SERVER_PATH);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.logged) {
            socketConnect();
        }
    }, [auth, socketConnect]);

    useEffect(() => {
        if (!auth.logged) {
            socketDisconnect();
        }
    }, [auth, socketDisconnect]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children}
        </SocketContext.Provider>
    )
}