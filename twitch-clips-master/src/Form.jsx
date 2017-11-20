import React, { Component } from 'react'
import { Input, Icon } from 'react-materialize'
import './App.css'

class Form extends Component{
    constructor(props){
        super(props)

        this.state = {
            inputText: this.props.value
        }
    }

    onChangeValue(event){
        this.setState({inputText:event.target.value})
        this.props.inputOnChangeValue(event.target.value)
    }

    onKeyPressHandler(event){
        if (event.key === 'Enter'){
            this.props.searchStreamer(this.state.inputText)
        } 
    }

    render(){
        return(
            <div className="form-group">
                <div className="form-input">
                    <Input 
                        s={6} 
                        onChange = { this.onChangeValue.bind(this) }
                        value={this.state.inputText} 
                        label="Search for a Streamer"
                        onKeyPress={ (event) => { this.onKeyPressHandler(event) } }>
                        <Icon>search</Icon>
                    </Input>
                </div>
            </div>
        )
    }
}

export default Form