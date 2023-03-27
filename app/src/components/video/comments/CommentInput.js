import React from 'react';
import './CommentInput.css';

const CommentInput = (props) => {

  const newMessage = () => {
    const sendBtn = document.querySelector(".btn-send");
    sendBtn.style.transform = "scale(0.8) rotate(10deg)";
    setTimeout(() => {
      sendBtn.style.transform = "";
    }, 250);
    const userComment = document.querySelector("#messageBox");
    if (userComment.textContent.length > 0) {
      fetch(`http://localhost:9000/api/comment/${props.videoId}`, {
        method: "POST",
        headers: {
          "Authorization": `bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userComment.textContent
        })
      })
      .then(async result => {
        const data = await result.json();
        return {...data, status: result.status}
      })
      .then(jsonData => {
        props.onNewComment(jsonData);
      })
      .catch(err => {
        console.log(err);
      })
      userComment.textContent = "";
      userComment.focus();
    }
  }

  const keyDownHandler = (event) => {
    if(event.key === "Enter") {
      event.preventDefault();
      newMessage();
    }
  }

  const commentClickHandler = (event) => {
    newMessage();
  }


  return (
    <div className='commentInput--container' onKeyDown={keyDownHandler} >
      <span id="messageBox" role="textbox" contentEditable="true" ></span>
      <i className="fa-solid fa-paper-plane btn-send" onClick={commentClickHandler} ></i>
    </div>
  )
}

export default CommentInput;