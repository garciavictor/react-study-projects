import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import { createStore } from 'redux'
import { Provider } from 'react-redux' 
import reducer from './reducers'

import { firebaseApp } from './firebase.js'
import { logUser } from './actions'

import App from './components/App'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import './index.css'

const store = createStore(reducer)

firebaseApp.auth().onAuthStateChanged( user => {
    if(user){
        store.dispatch(logUser(user.email))
        browserHistory.push('/app')
    } else {
        browserHistory.push('/signin')
    }

})

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </Router>
    </Provider>,
    document.getElementById("root")
)