import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import AuthRouter from './AuthRouter'
// Pages
import ChatPage from '../pages/ChatPage'

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />
                    <Route exact path="/" component={ChatPage} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;