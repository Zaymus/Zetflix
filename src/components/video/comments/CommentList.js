import React, { useEffect, useState } from 'react';
import Spinner from '../../ui/Spinner';
import Comment from './Comment';
import './CommentList.css';

const CommentList = (props) => {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    if (props.commentData) {
      document.querySelector(".commentList--container").setAttribute("data-state", "loaded");
    }

    if(props.commentData?.status === 200 || props.commentData?.status === 201) {
      setComments([]);
      props.commentData?.data?.forEach(comment => {
        setComments((prevState) => {
          return [...prevState, comment]
        });
      })
    }
  }, [props.commentData])

  return (
    <div className='commentList--container' data-state="loading" >
      {!props.commentData && <Spinner />}
      {comments.length === 0 && <span>{"No Comments found."}</span>}
      {comments.map(comment => {
        return <Comment data={comment} key={comment._id}/>
      })}
    </div>
  )
}

export default CommentList;