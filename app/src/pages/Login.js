import React from 'react';
import Card from '../components/ui/Card';
import LoginForm from '../components/forms/LoginForm';
import './Login.css';

const Login = (props) => {

  return (
    <div className="login--container">
      <Card>
        <LoginForm onLogin={props.onLogin}/>
      </Card>
    </div>
  )
}

export default Login;