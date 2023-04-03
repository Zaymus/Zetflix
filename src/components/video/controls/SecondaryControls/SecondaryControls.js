import React from 'react';
import Captions from "./Captions/Captions";
import PlayBackSpeed from "./Playback/PlayBackSpeed";
import FullScreen from "./FullScreen";

const SecondaryControls = (props) => {

  return (
    <div className="control--group">
      <Captions bottomControlRef={props.bottomControlRef} videoRef={props.videoRef} />
      <PlayBackSpeed 
        bottomControlRef={props.bottomControlRef}
        videoRef={props.videoRef}
        room={props.room}
        socket={props.socket}
      />
      <FullScreen 
        videoRef={props.videoRef} 
        fullscreenControls={props.fullscreenControls}/>
    </div>
  );
}

export default SecondaryControls;