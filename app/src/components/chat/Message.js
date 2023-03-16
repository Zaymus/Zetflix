import React from 'react';
import './Message.css';

const Message = (props) => {
  return (
    <div className={`message--container ${props.username === 'Me' ? 'from-me' : ''}`}>
      <h3>{props.username}</h3>
      <p>{props.message}</p>
    </div>
  );
}

export default Message;