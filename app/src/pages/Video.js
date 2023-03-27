import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from '../components/video/VideoPlayer';
import CommentSection from '../components/video/comments/CommentSection';

const Video = (props) => {
  const { videoId } = useParams();
  const [captions, setCaptions] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/api/caption/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      setCaptions(jsonData);
    })
    .catch(err => {
      console.log(err);
    });
  }, [videoId]);

  return (
    <div>
      <VideoPlayer 
        videoId={videoId}
        captions={captions}
      />

      <CommentSection videoId={videoId} />
    </div>
  );
}

export default Video;