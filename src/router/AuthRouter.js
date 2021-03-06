import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// Auth Pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
// CSS
import '../css/login-register.css';

const AuthRouter = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <Switch>
                        <Route exact path="/auth/" component={LoginPage} />
                        <Route exact path="/auth/register" component={RegisterPage} />

                        <Redirect to="/auth/" />
                    </Switch >
                </div>
            </div>
        </div>
    )
}

export default AuthRouter;