import React from 'react';
import './App.css';
import Login from './components/Login'
import { Router, Switch, Link } from 'react-router-dom';
import Main from './components/Main'
import { render } from '@testing-library/react';

const url = "http://localhost:3000"

class App extends React.Component {

  state = {
    currentUser: {},
    loginError: false,
    userIsLogin: false,
  }

  componentDidMount = () => {
    this.fetchData('user')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  fetchData = (type) => {
    return fetch(`${url}/${type}`)
  }

  handleSubmitSignUp = (e) => {
    e.preventDefault()
    fetch(`${url}/user`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
      })
    })
  }

  handleUserLogin = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    fetch(`${url}/user`)
    .then(res => res.json())
    .then((user) => {
      user.find(u => {
        if (u.username === username && u.password === password) {
          this.setState({ currentUser: u, userIsLogin: true })
          console.log(this.state.currentUser, this.state.userIsLogin)
        } else {
          this.setState({ loginError: true })
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
      {this.state.userIsLogin ? (
        <Main user={this.state.currentUser}/> ) : (
        <Login
        handleSubmitSignUp={this.handleSubmitSignUp}
        handleUserLogin={this.handleUserLogin}
        loginError={this.state.loginError}/>
      )}
      </div>
    );
  }
}

export default App;
