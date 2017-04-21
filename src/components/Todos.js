import React, { Component } from 'react'
import firebase from 'firebase'

export default class Todos extends Component {
  constructor(props) {
    super(props)
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

  render() {
    console.log('Todos render')
    return (
      <div className="todos">
        <div className="welcome">
          <h1>Todos</h1>
          <h3>Welcome {this.props.user.email}!</h3>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <div className="todoList">

        </div>
      </div>
    )
  }
}
