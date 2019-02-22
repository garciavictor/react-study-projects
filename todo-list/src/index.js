import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import {TodoContextProvider} from './context/TodoContext'

import './index.css'


ReactDOM.render(
    <TodoContextProvider>
        <App />
    </TodoContextProvider>,
    document.getElementById('root')
)