import { combineReducers } from 'redux'
import user from './reducerUser'
import goals from './reducerGoal'
import completeGoals from './reducerCompletedGoals'

export default combineReducers({ user, goals, completeGoals })