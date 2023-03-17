import React, { useState, useEffect } from 'react';
import Message from './Message';

const testMessages = [
  
];

const MessageList = (props) => {
  const [messages, setMessages] = useState(testMessages);
  const socket = props.socket;

  useEffect(() => {
    socket?.on('chatMessage', (message) => {
      setMessages((prevState) => {
        return [
          ...prevState,
          message,
        ]
      })
    });
  }, [socket]);

  return (
    <div className='messagelist--container'>
      {messages.map((message) => {
        return <Message username={message.username} message={message.message} />
      })}
    </div> 
  )
}

export default MessageList;