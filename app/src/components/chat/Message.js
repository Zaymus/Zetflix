import React, { Component } from 'react';
import './Message.css';

class Message extends Component {

  componentDidMount() {
    this.props.onNewMessage();
  }

  render() {
    return (
      <div className={`message--container ${this.props.username === 'tempUser' ? 'from-me' : ''}`} key={this.props.msgKey}>
        <h3>{this.props.username}</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default Message;