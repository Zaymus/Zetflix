import React from 'react';
import './Message.css';

const Message = (props) => {
  return (
    <div className={`message--container ${props.username === 'tempUser' ? 'from-me' : ''}`} key={props.msgKey}>
      <h3>{props.username}</h3>
      <p>{props.message}</p>
    </div>
  );
}

export default Message;