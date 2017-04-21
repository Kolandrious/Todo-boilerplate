import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    console.log('SignIn willMount')
    if (this.props.user.email) {
      this.props.history.push('/todos')
      return false
    }
    this.props.resetErrorMessage()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email) {
      this.props.history.push('/todos')
    }
  }

  changeEmail = (event) => {
    event.preventDefault()
    const email = event.target.value.trim()
    this.setState(state => ({ email }))
  }

  changePassword = (event) => {
    event.preventDefault()
    const password = event.target.value
    this.setState(state => ({ password }))
  }

  submit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.authenticate(email, password)
  }

  render() {
    console.log('SignIn render')
    if (this.props.user.email !== undefined) {
      return null
    }
    return (
      <div className="SignIn">
        <h1>Sign in</h1>
        <input
          type="text"
          onChange={this.changeEmail}
          value={this.state.email}
          placeholder="E-mail"
        />
        <input
          type="password"
          onChange={this.changePassword}
          value={this.state.password}
          placeholder="Password"
        />
        <button onClick={this.submit} >Sign in</button>
        <span>Don't have an account? <Link to="/signup">Sign up!</Link></span>
        <div className="errorMessage">{this.props.errorMessage}</div>
        <div>{this.props.loading.toString()}</div>
      </div>
    )
  }
}
