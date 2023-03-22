import React from 'react';
import './ChatInput.css';

const ChatInput = (props) => {
  const newMessage = () => {
    const sendBtn = document.querySelector(".btn-send");
    sendBtn.style.transform = "scale(0.8) rotate(10deg)";
    setTimeout(() => {
      sendBtn.style.transform = "";
    }, 250);
    const userMessage = document.querySelector("#messageBox");
    if (userMessage.textContent.length > 0) {
      const message  = {
        userId: localStorage.getItem('userId'),
        roomId: props.roomId,
        message: userMessage.textContent,
      }
      props.socket?.emit("room.chat", message);
      userMessage.textContent = "";
      userMessage.focus();
    }
  }

  const keyDownHandler = (event) => {
    if(event.key === "Enter") {
      event.preventDefault();
      newMessage();
    }
  }

  const sendClickHandler = (event) => {
    newMessage();
  }

  return (
    <div className='input--container' onKeyDown={keyDownHandler}>
      <span id="messageBox" role="textbox" contentEditable="true" ></span>
      <i className="fa-solid fa-paper-plane btn-send" onClick={sendClickHandler}></i>
    </div>
  );
}

export default ChatInput;