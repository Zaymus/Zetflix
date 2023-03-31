import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Video.css';
import WatchPartyBtn from './WatchPartyBtn';

const Video = (props) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const acceptedClasses = ["content--container", "videoInfo--container", "thumbnail", "videoTitle"]
    if(acceptedClasses.includes(e.target.className)) {
      navigate(`/video/${props.data._id}`);
    }
  }

  return (
    <div className="content--container" onClick={clickHandler}>
      <img className="thumbnail" src={`http://localhost:9000/api/video/thumbnail/${props.data._id}`} alt="video thumbnail" />
      <div className="videoInfo--container">
        <h3 className="videoTitle">{props.data.title}</h3>
        {props.state.token && <WatchPartyBtn videoId={props.data._id}/>}
      </div>
    </div>
  )
}

export default Video;