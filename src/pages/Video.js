import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from '../components/video/VideoPlayer';
import CommentSection from '../components/video/comments/CommentSection';

const Video = (props) => {
  const { videoId } = useParams();
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/caption/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(async response => {
      return {data: await response.json(), status: response.status};
    })
    .then(jsonData => {
      if(jsonData.status === 200) {
        setCaptions(jsonData);
      } else {
        setCaptions([]);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, [videoId]);

  return (
    <>
      <VideoPlayer 
        videoId={videoId}
        captions={captions}
      />

      <CommentSection videoId={videoId} />
    </>
  );
}

export default Video;