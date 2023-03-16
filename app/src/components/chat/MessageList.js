import React from 'react';
import Message from './Message';

const MessageList = (props) => {
  const messages = [
    {
      username: "TestUser",
      message: "hello1",
    },
    {
      username: "TestUser",
      message: "hello2",
    },
    {
      username: "Me",
      message: "Hey!",
    },
    {
      username: "TestUser",
      message: "hello3",
    },
    {
      username: "TestUser",
      message: "hello4",
    },
  ];

  return (
    <div className='messagelist--container'>
      {messages.map((message) => {
        return <Message username={message.username} message={message.message}/>
      })}
    </div> 
  )
}

export default MessageList;