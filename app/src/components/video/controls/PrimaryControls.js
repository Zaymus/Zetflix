import React from 'react';
import PlayPause from "./PlayPause";
import RewindSeek from "./RewindSeek";
import ForwardSeek from "./ForwardSeek";
import Volume from "./Volume";

const PrimaryControls = (props) => {

  return (
    <div className="control--group">
      <PlayPause videoRef={props.videoRef} />
      <RewindSeek videoRef={props.videoRef} />
      <ForwardSeek videoRef={props.videoRef} />
      <Volume videoRef={props.videoRef}/>
    </div>
  );
}

export default PrimaryControls;