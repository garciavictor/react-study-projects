import React, { Component } from 'react'
import { Button, Divider } from 'semantic-ui-react'
import { firebaseApp } from '../firebase' 
import { connect } from 'react-redux'

import Goal from './Goal'
import GoalList from './GoalList'
import CompleteGoalList from './CompleteGoalList'

class App extends Component {

    signOut(){
        firebaseApp.auth().signOut()
    }

    render(){
        return(
            <div>
                <Goal />
                <Divider />
                <div className="goals">Goals</div>
                <GoalList />
                <div className="completed-goals">Completed Goals</div>
                <CompleteGoalList />
                <Divider />
                <div className="sign-out">
                    <Button color='red' onClick={ () => { this.signOut() }}>SIGN OUT</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps, null)(App)