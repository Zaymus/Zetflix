import React from 'react';
import PlayPause from "./PlayPause";
import RewindSeek from "./RewindSeek";
import ForwardSeek from "./ForwardSeek";
import Volume from "./Volume/Volume";

const PrimaryControls = (props) => {

  return (
    <div className="control--group">
      <PlayPause videoRef={props.videoRef} room={props.room} socket={props.socket} isComplete={props.isComplete}/>
      <RewindSeek videoRef={props.videoRef} room={props.room} socket={props.socket} />
      <ForwardSeek videoRef={props.videoRef} room={props.room} socket={props.socket} />
      <Volume videoRef={props.videoRef}/>
    </div>
  );
}

export default PrimaryControls;