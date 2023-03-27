import React, { Component } from 'react';
import { required, length } from '../../util/validators';
import './LoginForm.css';

class LoginForm extends Component {
  state = {
    loginForm: {
      username: {
        value: '',
        validators: [required]
      },
      password: {
        value: '',
        validators: [required, length({ min: 5 })]
      },
      formIsValid: false
    }
  };

  inputChangeHandler = (input, e) => {
    const value = e.target.value;
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        if(inputName !== 'formIsValid'){
          formIsValid = formIsValid && updatedForm[inputName].valid;
        }
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  render() {
    return (
      <div className="loginform--container">
        <h1>Sign In</h1>
        <form onSubmit={e =>
            this.props.onLogin(e, {
              username: this.state.loginForm.username.value,
              password: this.state.loginForm.password.value
            })
          }>
          <p>Username</p>
          <input 
            type="text" 
            className="username--input" 
            id="username" 
            placeholder='Enter username'
            onChange={this.inputChangeHandler.bind(this, 'username')}
            value={this.state.loginForm['username'].value}
          ></input>

          <p>Password</p>
          <input 
            type="password" 
            className="password--input" 
            id="password" 
            placeholder='Enter password'
            onChange={this.inputChangeHandler.bind(this, 'password')}
            value={this.state.loginForm['password'].value}
          ></input>

          <button type="submit">Submit</button>
        </form>
        {/* <div className='form--links'>
          <a className='link' href='/' >Forgot Password?</a>
          <a className='link' href='/' >Don't have an account?</a>
        </div> */}
      </div>
    )
  }
}

export default LoginForm;