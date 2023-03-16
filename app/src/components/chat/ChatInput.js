import React from 'react';
import './ChatInput.css';

const ChatInput = () => {
  return (
    <div className='input--container'>
      <span role="textbox" contentEditable="true"></span>
      <i className="fa-solid fa-paper-plane btn-send"></i>
    </div>
  );
}

export default ChatInput;