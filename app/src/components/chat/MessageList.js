import React, { useState, useEffect } from 'react';
import Message from './Message';
import './MessageList.css';

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
      });
    });
  }, [socket]);

  const scrollToNewMessage = () => {
    const messageList = document.querySelector(".messagelist--container");
    messageList?.scrollTo({top: messageList.scrollHeight, left: 0, behavior: "smooth"});
  }

  return (
    <div className='messagelist--container'>
      <div className='messages'>
        {messages.map((message) => {
          return <Message username={message.username} message={message.message} onNewMessage={scrollToNewMessage}/>
        })}
      </div>
    </div> 
  )
}

export default MessageList;