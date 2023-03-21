import React from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import './Chat.css';

const Chat = (props) => {
  return (
  <div className='chat--container'>
    <ChatInput socket={props.socket} roomId={props.roomId}/>
    <MessageList socket={props.socket}/>
  </div>
  )
}

export default Chat;