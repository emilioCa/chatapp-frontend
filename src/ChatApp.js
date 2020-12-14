import React from 'react'
import SnackbarProvider from 'react-simple-snackbar';
import AuthProvider from './auth/AuthContext';
import LayoutProvider from './context/LayoutContext';
import AppRouter from './router/AppRouter';

const ChatApp = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <SnackbarProvider>
          <LayoutProvider>
            <AppRouter />
          </LayoutProvider>
        </SnackbarProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default ChatApp;