import React, { useState } from 'react';
import CaptionsModal from './CaptionsModal';
import './CaptionsModal.css';

const Captions = (props) => {
  const [showCaptions, setShowCaptions] = useState(false);
  const [selected, setSelected] = useState("1");

  const captionClickHandler = () => {
    setShowCaptions(!showCaptions);
  }

  return (
    <div>
      { showCaptions && <CaptionsModal bottomControlRef={props.bottomControlRef} showCaptions={setShowCaptions} videoRef={props.videoRef} selected={selected} setSelected={setSelected}/>}
      <i 
        className="fa-solid fa-closed-captioning controls--icon" 
        onClick={captionClickHandler}
      ></i>
    </div>
  )
}

export default Captions;