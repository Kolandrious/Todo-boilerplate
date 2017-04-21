import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text,
      complete: false,
    }
  }

  complete = () => {
    this.setState({ complete: !this.state.complete })
  }

  render() {
    console.log(this.props.id)
    const { text, complete } = this.state
    return (
      <div
        className="todoItem"
        onClick={() => { this.complete() }}
      >
        {text} {complete.toString()}
      </div>
    )
  }
}
