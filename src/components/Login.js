import React from 'react';


class Login extends React.Component {

  state = {
    showLogin: false,
    showSignUp: false,
  }

  handleLogin = (e) => {
    this.setState({ showLogin: !this.state.showLogin })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.setState({ showSignUp: !this.state.showSignUp })
  }

  render() {
    return (
      <div className="login">
      <h1>Epic Battle Game</h1>
      <button onClick={this.handleLogin} className="login-btn">Login</button>
      <button onClick={this.handleSignUp} className="login-btn">Sign Up</button>
      {this.state.showLogin ? (
        <div className="login-form">
        <form onSubmit={this.props.handleUserLogin}>
        <div>
        <input type="text" placeholder="Enter Username" name="username"/>
        </div>
        <input type="password" placeholder="Enter Password" name="password"/>
        <div>
        <button type="submit">Login</button>
        </div>
        </form>
      </div>
    ) : (
      ""
    )}
      {this.state.showSignUp ? (
        <div className="signup-form">
        <form onSubmit={this.props.handleSubmitSignUp}>
        <input type="text" placeholder="Enter Username" name="username"/>
        <div>
        <input type="password" placeholder="Enter Password" name="password"/>
        </div>
        <div>
        <button type="submit">Sign Up</button>
        </div>
        </form>
        </div>
      ) : (
        ""
      )}
      {this.props.loginError ? (
        <span className="error">Incorrect password or username. Try again.</span>
      ) : (
        ""
      )}
      <p>Some description about our game.</p>
      </div>
    )
  }
}

export default Login;
