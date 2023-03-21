import React, { useEffect } from 'react';
import PlaybackModalItem from './PlaybackModalItem';

const PlaybackForm = (props) => {
  const speedClickHandler = (event) => {
    var div = event.target;
    while (div.nodeName !== "DIV") {
      div = div.parentNode;
    }
    props.videoRef.current.playbackRate = div.getAttribute('data-value');
    props.socket?.emit("room.playbackRate", {
      speed: div.getAttribute('data-value'), 
      roomId: props.room
    });
    props.setSelected(div.getAttribute('data-value'));
  }

  useEffect(() => {
		props.socket?.on("videoSpeed", (speed) => {
      console.log(speed);
 			props.videoRef.current.playbackRate = speed;
      props.setSelected(speed);
		});
	}, [props]);

  return (
    <div className='playback-speeds'>
      <PlaybackModalItem 
        value="0.5" 
        selected={props.selected === "0.5"}
        onClick={speedClickHandler}
      />
      <PlaybackModalItem 
        value="0.75" 
        selected={props.selected === "0.75"}
        onClick={speedClickHandler}
      />
      <PlaybackModalItem 
        value="1" 
        selected={props.selected === "1"}
        onClick={speedClickHandler}
      />
      <PlaybackModalItem 
        value="1.25" 
        selected={props.selected === "1.25"}
        onClick={speedClickHandler}
      />
      <PlaybackModalItem 
        value="1.5" 
        selected={props.selected === "1.5"}
        onClick={speedClickHandler}
      />
    </div>
  )
}

export default PlaybackForm;