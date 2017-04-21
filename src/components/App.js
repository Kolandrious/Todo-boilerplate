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

  componentWillMount() {
    // get user from localstorage and log him in
    const storage = firebase.storage()
    console.log('App willMount', storage)
  }

  signUp = (email, password) => {
    this.setState(state => ({ loadingCreateUser: true }))
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      const user = firebase.auth().currentUser
      console.log('registered', user)
      this.setState(state => ({ user, loadingCreateUser: false }))
    }).catch(error => {
      console.log(error.message)
      this.setState(state => ({ errorMessage: error.message, loadingCreateUser: false }))
    })
  }

  signIn = (email, password) => {
    this.setState(() => ({ loadingSignInUser: true }))
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      const user = firebase.auth().currentUser
      console.log('logged in', user)
      this.setState(state => ({ user, loadingSignInUser: false }))
    }).catch(error => {
      console.log(error.message)
      this.setState(state => ({ errorMessage: error.message, loadingSignInUser: false }))
    })
  }

  logout = () => {
    this.setState(state => ({ user: {} }))
    firebase.auth().signOut()
    .then(() => {
      console.log('sign out')
    }).catch(error => {
      console.log(error)
    })
    // clear localstorage?
  }

  resetErrorMessage = () => {
    this.setState({ errorMessage: '' })
  }

  render() {
    console.log('App render')
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" exact render={props => (
            <SignIn
              {...props}
              errorMessage={this.state.errorMessage}
              user={this.state.user}
              authenticate={this.signIn}
              resetErrorMessage={this.resetErrorMessage}
              loading={this.state.loadingSignInUser}
            />
          )} />
          <Route path="/signup" exact render={props => (
            <SignUp
              {...props}
              errorMessage={this.state.errorMessage}
              user={this.state.user}
              createUser={this.signUp}
              resetErrorMessage={this.resetErrorMessage}
              loading={this.state.loadingCreateUser}
            />
          )} />
          <Route path="/todos" exact render={props => (
            <Todos
              {...props}
              logout={this.logout}
              user={this.state.user}
            />
          )} />
          <Redirect from="*" to="/todos" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
