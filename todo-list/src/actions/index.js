import { ADD_TODO, DELETE_TODO, CLEAR_TODOS } from '../constants'

export const addTodoAction = (text, dueDate) => {
    const action = {
        type: ADD_TODO,
        dueDate,
        text
    }
    return action
}

export const deleteTodoAction = (id) => {
    const action = {
        type: DELETE_TODO,
        id
    }
    return action
}

export const clearTodosAction = () => {
    return {
        type: CLEAR_TODOS
    }
}