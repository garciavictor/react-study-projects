import React, { Component } from 'react'
import { completeGoalRef } from '../firebase'
import { connect } from 'react-redux'
import { setCompleted } from '../actions'
import { Segment, Button } from 'semantic-ui-react'

class CompleteGoalList extends Component {
    componentDidMount(){
        let completeGoals = []
        completeGoalRef.on('value', snap => {
            snap.forEach( completeGoal => {
                const { email, goalTitle } = completeGoal.val()
                completeGoals.push({ email, goalTitle })
            })
            this.props.setCompleted(completeGoals)
        })
    }

    clearAll(){
        completeGoalRef.set([])
    }

    render(){
        return (
            <div>
                <Segment.Group className="segment-complete-goal-list">
                    { this.props.completeGoals.map( (completeGoal, index) => {
                        const { email, goalTitle } = completeGoal
                        return (
                            <Segment clearing key={index}>
                                <div>
                                    <strong> { goalTitle } </strong>
                                    <div> 
                                        Completed by <em> { email } </em>
                                    </div>
                                </div>
                            </Segment>
                        )
                        })}
                </Segment.Group>
                <div className="clear-button">
                    <Button primary onClick={ () => this.clearAll()}>
                        CLEAR ALL
                    </Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { completeGoals } = state
    return { completeGoals }
}


export default connect(mapStateToProps, { setCompleted })(CompleteGoalList)