import React, { Component } from 'react';
import Card from '../components/ui/Card';
import LoginForm from '../components/forms/LoginForm';
import './Login.css';

class Login extends Component {

  render() {
    return (
      <div className="login--container">
        <Card>
          <LoginForm onLogin={this.props.onLogin}/>
        </Card>
      </div>
    )
  }
}

export default Login;