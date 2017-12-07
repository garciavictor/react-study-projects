import React, { Component } from 'react'
import FormGroup from './FormGroup.jsx'

class App extends Component{
    render(){
        return (
            <div className="app">
                <div className="app-title">
                    TODO LIST
                </div>
                <FormGroup/>
            </div>
        )
    }
}

export default App