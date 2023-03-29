import React, { useEffect } from 'react';
import './Video.css';

const Video = (props) => {

  useEffect(() => {
  }, []);

  return (
    <div className="content--container">
      <img src={`http://localhost:9000/api/video/thumbnail/${props.data._id}`} alt="video thumbnail" />
      <div className="videoInfo--container">
        <h3>{props.data.title}</h3>
      </div>
    </div>
  )
}

export default Video;