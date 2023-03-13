import React from 'react';
import PlaybackForm from './PlaybackForm';
import './PlaybackModal.css';

const PlaybackModal = (props) => {
  var bottomControlRef = props.bottomControlRef.current.getBoundingClientRect();

  const playBackMouseLeaveHandler = () => {
    props.showSpeeds(false);
  }

  return (
    <div 
      className='playbackModal--container' 
      style={{bottom: bottomControlRef.height + 10 + "px" }}
      onMouseLeave={playBackMouseLeaveHandler}
    >
      <p>Playback Speed</p>
      <PlaybackForm 
        videoRef={props.videoRef} 
        selected={props.selected} 
        setSelected={props.setSelected}
      />
    </div>
  );
}

export default PlaybackModal;