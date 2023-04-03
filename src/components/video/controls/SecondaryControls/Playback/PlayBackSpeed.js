import React, { useState } from 'react';
import PlaybackModal from './PlaybackModal';

const PlayBackSpeed = (props) => {
  const [showSpeeds, setShowSpeeds] = useState(false);
  const [selected, setSelected] = useState("1");

  const speedClickHandler = () => {
    setShowSpeeds(!showSpeeds);
  }

  return (
    <div>
      { showSpeeds && <PlaybackModal bottomControlRef={props.bottomControlRef} showSpeeds={setShowSpeeds} videoRef={props.videoRef} selected={selected} setSelected={setSelected} room={props.room} socket={props.socket} />}
      <i 
        className="fa-solid fa-gauge-high controls--icon" 
        onClick={speedClickHandler}
      ></i>
    </div>
  )
}

export default PlayBackSpeed;