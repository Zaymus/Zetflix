import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import './CommentSection.css';

const CommentSection = (props) => {
  const location = useLocation();
  const [comments, setComments] = useState(null);

  const newCommentHandler = (newComment) => {
    const comment = newComment.comment;
    setComments((prevState) => {
      return {
        data: [
          comment,
          ...prevState.data
        ],
        status: newComment.status
      }
    });
  }

  useEffect(() => {
    fetch(`http://localhost:9000/api/comment/${props.videoId}`)
    .then(async result => {
      const data = await result.json();
      return {data: data, status: result.status};
    })
    .then(jsonData => {
      setComments(jsonData);
    })
    .catch(err => {
      console.log(err);
    })
  }, [props.videoId])

  return (
    <section className='comments--container'>
      {localStorage.getItem("token") && <CommentInput videoId={props.videoId} onNewComment={newCommentHandler}/> }
      {!localStorage.getItem("token") && 
        <div className="commentInput--container">
          <p>You must be logged in to comment. <Link to={`/login?redirectUri=${location.pathname}`}>Login Here.</Link></p>
        </div>
      }
      <hr />
      <CommentList commentData={comments}/>
    </section>
  )
}

export default CommentSection;