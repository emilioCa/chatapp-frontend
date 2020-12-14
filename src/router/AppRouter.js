import React, { useContext, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
// Context
import AuthContext from '../auth/AuthContext';
// Router
import PublicRoute from './PublicRoute'
import AuthRouter from './AuthRouter'
// Pages
import ChatPage from '../pages/ChatPage'

const AppRouter = () => {

    const { auth, verifyToken } = useContext(AuthContext);

    useEffect(() => verifyToken(), [verifyToken]);

    if (auth.checking) {
        return <h1>Wait please...</h1>;
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        isAuthenticated={auth.logged}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuthenticated={auth.logged}
                        exact
                        path="/"
                        component={ChatPage}
                    />

                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;