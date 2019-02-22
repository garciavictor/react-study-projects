import React, { createContext, useReducer } from 'react';
import reducer from '../reducers'
import { read_cookie } from 'sfcookies'



const TodoContext = createContext();
function TodoContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, read_cookie('todos'));
    return (
        <TodoContext.Provider value={[state, dispatch]}>
            {children}
        </TodoContext.Provider>
    )

}

export { TodoContext, TodoContextProvider };