import { ADD_TODO, DELETE_TODO, CLEAR_TODOS } from '../constants'

export const addTodo = (text, dueDate) => {
    const action = {
        type: ADD_TODO,
        dueDate,
        text
    }

    console.log('add', action)
    return action
}

export const deleteTodo = (id) => {
    const action = {
        type: DELETE_TODO,
        id
    }
    console.log('remove', action)
    return action
}

export const clearTodos = () =>{
    return {
        type: CLEAR_TODOS
    }
}