import React from 'react'
import SnackbarProvider from 'react-simple-snackbar';
import AuthProvider from './auth/AuthContext';
import LayoutProvider from './context/LayoutContext';
import AppRouter from './router/AppRouter';

const ChatApp = () => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <LayoutProvider>
          <AppRouter />
        </LayoutProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default ChatApp;