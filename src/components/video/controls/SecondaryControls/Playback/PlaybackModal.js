import React from 'react';
import PlaybackModalList from './PlaybackModalList';
import './PlaybackModal.css';

const PlaybackModal = (props) => {
  var bottomControlRef = props.bottomControlRef.current.getBoundingClientRect();

  const playBackMouseLeaveHandler = () => {
    props.showSpeeds(false);
  }

  return (
    <div 
      className='playbackModal--container' 
      style={{bottom: bottomControlRef.height - 10 + "px" }}
      onMouseLeave={playBackMouseLeaveHandler}
    >
      <p>Playback Speed</p>
      <PlaybackModalList 
        videoRef={props.videoRef} 
        selected={props.selected} 
        setSelected={props.setSelected}
        room={props.room}
        socket={props.socket}
      />
    </div>
  );
}

export default PlaybackModal;