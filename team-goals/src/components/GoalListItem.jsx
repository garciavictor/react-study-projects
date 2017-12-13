import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

import { completeGoalRef, goalRef } from '../firebase'
import { connect } from 'react-redux'


class GoalListItem extends Component {


    completeGoal(){
        const { email } = this.props.user
        const { goalTitle, goalKey } = this.props.goal
        goalRef.child(goalKey).remove() 
        completeGoalRef.push({ email, goalTitle })
    }

    render(){
        const { email, goalTitle } = this.props.goal
        return (
            <Segment clearing>
                   <Button floated='right' onClick={ () => this.completeGoal() }>
                        Complete
                    </Button>
                    <div>
                        <strong>
                            { goalTitle }
                        </strong>
                        <div>
                            Submitted by
                            <em> { email } </em>
                        </div>
                    </div>
            </Segment>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, null)(GoalListItem)