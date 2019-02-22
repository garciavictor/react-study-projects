import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import moment from 'moment'

export default function Todo(props) {
    return (
        <Segment.Group>
            { props.todos && props.todos.map( todo => {
                return (
                    <Segment key={todo.id} clearing className="segment-item">
                        <span className="todo-item">{todo.text}</span> 
                        <em> { moment(new Date(todo.dueDate)).fromNow() }</em>
                        <Icon  
                            className="todo-delete-button" 
                            onClick={ () => { props.deleteTodo(todo.id) } } 
                            name='delete'
                        />
                    </Segment>
                )
            })}
        </Segment.Group>
    )
}