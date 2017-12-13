import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { goalRef } from '../firebase'
import { connect} from 'react-redux'

class Goal extends Component {
    constructor(props){
        super(props)

        this.state = {
            goalTitle: ''
        }
    }

    addGoal(){
        const { goalTitle } = this.state 
        const { email } = this.props.user
        goalRef.push({email, goalTitle})
    }

    render(){
        return (
            <div>
                <h3 className="goals-title">GOALS APP</h3>
                <div className="form-goal">
                    <Input 
                        className="add-goal-input" 
                        placeholder='Goal tittle' 
                        onChange={ event => this.setState({ goalTitle: event.target.value }) }
                        action={
                            <Button className="submit-goal" onClick={ () => { this.addGoal() }}>
                                ADD GOAL
                            </Button>}
                        />

                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, null)(Goal)