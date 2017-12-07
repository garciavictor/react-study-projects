import { ADD_TODO, DELETE_TODO, CLEAR_TODOS } from '../constants'
import { bake_cookie, read_cookie } from 'sfcookies'

const todo = (action) => {
    const { text, dueDate } = action
    return {
        text: text,
        dueDate: dueDate,
        id: Math.random()
    }
}

const removeById = ( state = [], id ) => {
    const todos = state.filter( todo => todo.id !== id)
    return todos
}

const todos = ( state = [], action ) => {
    let todos = null
    state = read_cookie('todos')
    switch(action.type) {
        case ADD_TODO:
            todos = [...state, todo(action)]
            bake_cookie('todos', todos)
            return todos
        case DELETE_TODO:
            todos = removeById(state, action.id)
            bake_cookie('todos', todos)
            return todos
        case CLEAR_TODOS:
            todos = []
            bake_cookie('todos', todos)
            return todos
        default:
            return state
    }
}

export default todos