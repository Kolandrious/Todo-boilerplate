import firebase from 'firebase'
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Todos from './Todos'
import '../App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      errorMessage: '',
      loadingCreateUser: false,
      loadingSignInUser: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(newUser => {
      if (newUser) {
        this.setState(() => ({ user: newUser }))
      } else {
        this.setState(() => ({ user: {} }))
      }
    })
  }

  signUp = (email, password) => {
    this.setState(() => ({ loadingCreateUser: true }))
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log('registered')
      this.setState(() => ({ loadingCreateUser: false }))
    }).catch(error => {
      console.log(error.message)
      this.setState(() => ({ errorMessage: error.message, loadingCreateUser: false }))
    })
  }

  signIn = (email, password) => {
    this.setState(() => ({ loadingSignInUser: true }))
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('logged in')
      this.setState(() => ({ loadingSignInUser: false }))
    }).catch(error => {
      console.log(error.message)
      this.setState(() => ({ errorMessage: error.message, loadingSignInUser: false }))
    })
  }

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('sign out')
    }).catch(error => {
      console.log(error)
    })
  }

  resetErrorMessage = () => {
    this.setState({ errorMessage: '' })
  }

  render() {
    console.log('App render')
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/signin"
            render={props => (
              <SignIn
                {...props}
                errorMessage={this.state.errorMessage}
                user={this.state.user}
                authenticate={this.signIn}
                resetErrorMessage={this.resetErrorMessage}
                loading={this.state.loadingSignInUser}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                errorMessage={this.state.errorMessage}
                user={this.state.user}
                createUser={this.signUp}
                resetErrorMessage={this.resetErrorMessage}
                loading={this.state.loadingCreateUser}
              />
            )}
          />
          <Route
            exact
            path="/todos"
            render={props => (
              <Todos
                {...props}
                logout={this.logout}
                user={this.state.user}
              />
            )}
          />
          <Redirect from="*" to="/todos" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
