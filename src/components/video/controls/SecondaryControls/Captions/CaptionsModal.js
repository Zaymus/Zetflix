import React from 'react';
import CaptionsModalList from './CaptionsModalList';
import './CaptionsModal.css';

const CaptionsModal = (props) => {
  var bottomControlRef = props.bottomControlRef.current.getBoundingClientRect();

  const captionsMouseLeaveHandler = () => {
    props.showCaptions(false);
  }

  return (
    <div 
      className='captionsModal--container' 
      style={{bottom: bottomControlRef.height - 10 + "px" }}
      onMouseLeave={captionsMouseLeaveHandler}
    >
      <p>Captions</p>
      <CaptionsModalList 
        videoRef={props.videoRef} 
        selected={props.selected} 
        setSelected={props.setSelected}
      />
    </div>
  );
}

export default CaptionsModal;