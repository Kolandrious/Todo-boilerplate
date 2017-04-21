import React, { Component } from 'react'
import firebase from 'firebase'
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

  id = () => (this.counter++)

  addTodo = (e) => {
    e.preventDefault()
    this.setState(state => {
      if (!state.text) {
        return null
      }
      const todos = state.todos.concat()
      const text = ''
      todos.push(state.text)
      return ({ todos, text })
    })
  }

  onChange = (e) => {
    const text = e.target.value
    this.setState(state => ({ text }))
  }

  render() {
    const { todos } = this.state
    console.log('Todos render')
    return (
      <div className="todos">
        <div className="welcome">
          <h1>Todos</h1>
          <h3>Welcome {this.props.user.email}!</h3>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <div className="todoList">
          <div className="todos">
            {todos.map((todo, id) => {
              return (
                <TodoItem
                  text={todo}
                  key={id}
                  id={this.id}
                />
              )
            })}
          </div>
          <form className="addTodo">
            <input
              type="text"
              value={this.state.text}
              onSubmit={(e) => { this.addTodo(e) }}
              onChange={this.onChange}
            />
            <input type="submit" onClick={(e) => { this.addTodo(e) }} value="Add!" />
          </form>
        </div>
      </div>
    )
  }
}
