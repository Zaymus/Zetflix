import React from 'react';
import './Comment.css';

const Comment = (props) => {
  const likeClickHandler = (e) => {
    const icon = e.target;
    const counter = e.target.nextElementSibling;
    const state = icon.getAttribute("data-clicked") === "false" ? "true" : "false";
    icon.setAttribute("data-clicked", state);

    if (state === "true") {
      counter.innerHTML = parseInt(counter.innerHTML) + 1;
      fetch(`${process.env.REACT_APP_API_URL}/api/comment/rate/${props.data._id}?type=like`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }});
    } else {
      counter.innerHTML = parseInt(counter.innerHTML) - 1;
    }
  }

  const dislikeClickHandler = (e) => {
    const icon = e.target;
    const counter = e.target.nextElementSibling;
    const state = icon.getAttribute("data-clicked") === "false" ? "true" : "false";
    icon.setAttribute("data-clicked", state);

    if (state === "true") {
      counter.innerHTML = parseInt(counter.innerHTML) + 1;
      fetch(`${process.env.REACT_APP_API_URL}/api/comment/rate/${props.data._id}?type=dislike`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }});
    } else {
      counter.innerHTML = parseInt(counter.innerHTML) - 1;
    }
  }

  return (
    <div className="comment--container">
      <div className="img--wrapper">
        <img alt="user avatar" src={`${process.env.REACT_APP_API_URL}/api/users/${props.data.author.userId}/avatar`}/>
      </div>
      <h1 className='comment--author'>{props.data.author.username}</h1>
      <p className="comment--message">{props.data.message}</p>
      <div className="ratings">
        <span>
          <i className="fa-solid fa-thumbs-up" data-clicked="false" onClick={likeClickHandler}></i>
          <span>{props.data.likes}</span>
        </span>
        <span>
          <i className="fa-solid fa-thumbs-down" data-clicked="false" onClick={dislikeClickHandler}></i>
          <span>{props.data.dislikes}</span>
        </span>
      </div>
    </div>
  )
}

export default Comment;