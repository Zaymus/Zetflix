import React from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import './Chat.css';

const Chat = () => {
  return (
  <div className='chat--container'>
    <ChatInput />
    <MessageList />
  </div>
  )
}

export default Chat;