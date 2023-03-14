import React from 'react';
import Captions from "./Captions";
import PlayBackSpeed from "./PlayBackSpeed";
import FullScreen from "./FullScreen";

const SecondaryControls = (props) => {

  return (
    <div className="control--group">
      <Captions />
      <PlayBackSpeed bottomControlRef={props.bottomControlRef} videoRef={props.videoRef}/>
      <FullScreen 
        videoRef={props.videoRef} 
        fullscreenControls={props.fullscreenControls}/>
    </div>
  );
}

export default SecondaryControls;