import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    console.log('SignUp willMount', this.props.user)
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
    this.setState(() => ({ email }))
  }

  changePassword = (event) => {
    event.preventDefault()
    const password = event.target.value
    this.setState(() => ({ password }))
  }

  signUp = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.createUser(email, password)
  }

  render() {
    console.log('SignUp render')
    if (this.props.user.email !== undefined) {
      return null
    }
    return (
      <div className="SignUp">
        <h1>Sign up</h1>
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
        <button onClick={this.signUp} >Sign up</button>
        <span>Already registered? <Link to="/signin">Log in!</Link></span>
        <div className="errorMessage">{this.props.errorMessage}</div>
        <div>{this.props.loading.toString()}</div>
      </div>
    )
  }
}
