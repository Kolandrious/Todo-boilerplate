import React, { Component } from 'react'
import { cloneDeep } from 'lodash'
import TodoItem from './TodoItem'

export default class Todos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      text: '',
    }

    this.counter = 1
  }

  componentWillMount() {
    console.log('Todos willMount')
    if (this.props.user.email === undefined) {
      this.props.history.push('/signin')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email === undefined) {
      this.props.history.push('/signin')
    }
  }

  addTodo = (e) => {
    e.preventDefault()
    this.setState(state => {
      if (!state.text) {
        return null
      }
      const text = ''
      const todos = state.todos.concat()
      todos.push({ text: state.text, complete: false, id: this.counter++})
      return ({ todos, text })
    })
  }

  onChange = (e) => {
    const text = e.target.value
    this.setState(state => ({ text }))
  }

  completeTodo = (id) => {
    this.setState(state => {
      const todos = state.todos.concat()
      const newTodos = todos.map(todo => {
        const newTodo = cloneDeep(todo)
        if (newTodo.id === id) {
          newTodo.complete = !newTodo.complete
        }
        return newTodo
      })
      return { todos: newTodos }
    })
  }

  deleteTodo = (id) => {
    this.setState(state => {
      const todos = state.todos.concat()
      const newTodos = todos.filter(todo => todo.id !== id)
      return { todos: newTodos }
    })
  }

  render() {
    const { todos } = this.state
    return (
      <div className="todos">
        <div className="welcome">
          <h1>Todos</h1>
          <h3>Welcome {this.props.user.email}!</h3>
          <button className="btn btn-outline-danger"onClick={this.props.logout}>Logout</button>
        </div>
        <div className="todoList card card-block">
          <ul className="list-group">
            {todos.map((todo, index) => {
              return (
                <TodoItem
                  text={todo.text}
                  complete={todo.complete}
                  id={todo.id}
                  key={todo.id}
                  completeTodo={this.completeTodo}
                  deleteTodo={this.deleteTodo}
                  number={index+1}
                />
              )
            })}
          </ul>
          <form className="form-inline">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={this.state.text}
                onSubmit={(e) => { this.addTodo(e) }}
                onChange={this.onChange}
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={(e) => { this.addTodo(e) }}>
                    Add!
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
