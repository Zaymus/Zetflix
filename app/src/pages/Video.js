import React, { useState } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';

const Video = (props) => {
  const [captions, setCaptions] = useState("");

  if(!captions) {
    fetch(`http://localhost:9000/api/caption/${props.videoId}`, {
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
  }

	return (
		<div>
			<VideoPlayer 
				videoId={props.videoId}
				captions={captions}
			/>
		</div>
	);
}

export default Video;