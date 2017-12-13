import React, { Component } from 'react'
import { goalRef } from '../firebase'
import { connect } from 'react-redux'
import { setGoals } from '../actions'

import GoalListItem from './GoalListItem'

import { Segment } from 'semantic-ui-react'

class GoalList extends Component {

    componentDidMount(){
        goalRef.on('value', snap => {
            let goals = []
            snap.forEach( goal => {
                const { email, goalTitle } = goal.val()
                const goalKey = goal.key
                goals.push({ email, goalTitle, goalKey })
            })
            this.props.setGoals(goals)
        })
    }

    render(){
        return (
            <Segment.Group className="segment-goal-list">
                    { this.props.goals.map( (goal, index) => {
                        return (
                            <GoalListItem key={index} goal={goal}/>
                        )
                    })}
            </Segment.Group>
        )
    }

}

function mapStateToProps(state) {
    const { goals } = state
    return { goals }
}

export default connect(mapStateToProps, { setGoals })(GoalList)