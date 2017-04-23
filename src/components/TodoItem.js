import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text,
      complete: false,
      id: this.props.id(),
    }
    console.log(this.state.id)
    this.completeStyle = {
      textDecoration: 'line-through',
      color: 'grey'
    }
  }

  complete = () => {
    this.setState({ complete: !this.state.complete })
  }

  render() {
    const { text, complete } = this.state
    return (
      <div
        className="todoItem"
        onClick={() => { this.complete() }}
      >
      {this.state.id}.
      {complete ? <span style={this.completeStyle}>{text}</span> : text}
      </div>
    )
  }
}
