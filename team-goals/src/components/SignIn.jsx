import React, { Component } from 'react'
import { Button, Icon, Input, Segment } from 'semantic-ui-react'

import { Link } from 'react-router'

import { firebaseApp } from '../firebase'

class SignIn extends Component {
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

    signIn(){
        const { email, password } = this.state
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
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
                    SIGN IN
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
                    <Button content='SIGN IN' color="green" onClick={ () => { this.signIn() }}/>
                </div>
                <div className="sign-link">
                    <Link to="/signup">
                        If you are not a user, Sign Up.
                    </Link>
                </div>
            </Segment>
        )
    }

}

export default SignIn