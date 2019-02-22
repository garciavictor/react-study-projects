import React, { useState, useContext } from 'react'
import { addTodoAction, deleteTodoAction, clearTodosAction } from '../actions'
import { Button, Input, Form } from 'semantic-ui-react'
import Todos from './Todos'
import 'react-widgets/dist/css/react-widgets.css'

import moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'
import { TodoContext } from '../context/TodoContext';

moment.locale('en')
momentLocalizer()





function FormGroup(props) {
    const [state, dispatch] = useContext(TodoContext);
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState(moment());

    const handleDateTimeChange = (date) => {
        setDueDate(date);
    }

    const addTodo = () => {
        dispatch(addTodoAction(text, dueDate))
        setText('');
    }

    const deleteTodo = (id) => {
        dispatch(deleteTodoAction(id))
    }

    return (
        <div>
            <Form className="form-group">
                <Form.Field>
                    <Input 
                        className="input-todo"
                        size="large"
                        action={<Button color='blue' onClick={ () => { addTodo() }}> ADD TODO </Button>} 
                        placeholder="I have to ..."
                        value={text} 
                        onChange={event => setText(event.target.value)}
                        />
                        <DateTimePicker 
                            className="date-picker"
                            placeholder="Date/Time"
                            onChange={ (date) => handleDateTimeChange(date) }
                            step={15}
                        />
                </Form.Field>
            </Form>
            <div className="todo-list-view">
                <Todos todos={state} deleteTodo={deleteTodo}/>
                <Button negative onClick={ () => dispatch(clearTodosAction()) }>
                    CLEAR TODOS
                </Button>
            </div>
        </div>
    )

}

export default FormGroup