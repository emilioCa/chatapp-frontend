import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    const socketConnect = useCallback(() => {
        const token = localStorage.getItem('token');

        const socketTemp = io.connect(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true, // Creates a new connection for each instance
            query: {
                'x-token': token,
            }
        });

        setSocket(socketTemp);
    }, [serverPath]);

    const socketDisconnect = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        socket.on('connect', () => setOnline(true));
    }, [socket])

    useEffect(() => {
        socket.on('disconnect', () => setOnline(false));
    }, [socket])

    return {
        socket,
        online,
        socketConnect,
        socketDisconnect
    }
}