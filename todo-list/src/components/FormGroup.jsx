import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, deleteTodo, clearTodos } from '../actions'
import { Button, Input, Form, Segment, Icon } from 'semantic-ui-react'

import 'react-widgets/dist/css/react-widgets.css'

import moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'

moment.locale('en')
momentLocalizer()


class FormGroup extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: '',
            dueDate: moment() 
        }
        
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    }

    addTodo(){
        this.props.addTodo(this.state.text, this.state.dueDate)
        this.setState({
            text: ''
        })
    }

    deleteTodo(id){
        this.props.deleteTodo(id)
    }

    handleDateTimeChange(date){
        this.setState({
            dueDate: date
        });
    }

    renderTodo(){
        const  { todos } = this.props
        return (
            <Segment.Group>
                { todos.map( todo => {
                    return (
                        <Segment key={todo.id} clearing className="segment-item">
                            <span className="todo-item">{todo.text}</span> 
                            <em> { moment(new Date(todo.dueDate)).fromNow() }</em>
                            <Icon  
                                className="todo-delete-button" 
                                onClick={ () => { this.deleteTodo(todo.id) } } 
                                name='delete'
                            />
                        </Segment>
                    )
                })}
            </Segment.Group>
        )
    }

    render(){
        return (
            <div>
                <Form className="form-group">
                    <Form.Field>
                        <Input 
                            className="input-todo"
                            size="large"
                            action={<Button color='blue' onClick={ () => { this.addTodo() }}> ADD TODO </Button>} 
                            placeholder="I have to ..."
                            value={this.state.text} 
                            onChange={ event => this.setState({ text: event.target.value })}
                            />
                        <div>
                            <DateTimePicker 
                                className="date-picker"
                                placeholder="Date/Time"
                                onChange={this.handleDateTimeChange}
                                step={15}
                            />
                        </div>
                    </Form.Field>
                </Form>
                <div className="todo-list-view">
                    { this.renderTodo() }
                    <Button negative onClick={ () => this.props.clearTodos() }>
                        CLEAR TODOS
                    </Button>
                </div>
            </div>
        )
    }   
}

function mapStateToProps(state){
    return {
        todos: state 
    }
}

export default connect(mapStateToProps, { addTodo, deleteTodo, clearTodos })(FormGroup)