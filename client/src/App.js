import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import MenuBar from './components/MenuBar'

import { AuthProvider } from './context/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar/>
                    <Switch>
                        <Route path={ '/' } component={ Home } exact/>
                        <Route path={ '/login' } component={ Login }/>
                        <Route path={ '/register' } component={ Register }/>
                        <Route path={ '/posts/:postId' }
                               component={ SinglePost }/>
                    </Switch>
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
