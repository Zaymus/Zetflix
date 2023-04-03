import React from 'react';
import Card from '../components/ui/Card';
import LoginForm from '../components/forms/LoginForm';
import NotificationList from '../components/ui/Notification/NotificationList';
import './Login.css';

const Login = (props) => {

  return (
    <div className='login--bg'>
      <NotificationList notification={props.error} removeNotification={props.removeNotification}/>
      <div className="login--container">
        <Card>
          <LoginForm onLogin={props.onLogin}/>
        </Card>
      </div>
    </div>
  )
}

export default Login;