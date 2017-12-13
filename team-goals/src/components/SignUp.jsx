import React, { Component } from 'react'
import { Button, Icon, Input, Segment } from 'semantic-ui-react'

import { Link } from 'react-router'

import { firebaseApp } from '../firebase'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signUp(){
        const { email, password } = this.state
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch( error => {
                this.setState({
                    error
                })   
            })
    }

    render(){
        return (
            <Segment inverted className="sign-segment">
                <h2 className="sign-title">
                    SIGN UP
                </h2>
                <div className="form-group">
                    <Input 
                        iconPosition='left' 
                        placeholder='Email' 
                        onChange={ event => this.setState({ email: event.target.value }) }
                    >
                        <Icon name='at' />
                        <input />
                    </Input>
                    <Input 
                        iconPosition='left' 
                        placeholder='Password' 
                        type="password" 
                        onChange={ event => this.setState({ password: event.target.value }) } 
                    >
                        <Icon name='lock' />
                        <input />
                    </Input>
                    <div className="error-message">{this.state.error.message}</div>
                    <Button content='SIGN UP' color="blue" onClick={ () => { this.signUp() }}/>
                </div>
                <div className="sign-link">
                    <Link to="/signin">
                        Already a user? Sign In.
                    </Link>
                </div>
            </Segment>
        )
    }

}

export default SignUp