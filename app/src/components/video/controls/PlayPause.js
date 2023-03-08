import React, { useState } from 'react';

const PlayPause = (props) => {
  const [videoState, setVideoState] = useState("paused");

	const playPauseClickHandler = () => {
  	if (videoState === "paused") {
			props.videoRef.current.play();
			setVideoState("playing");
		}

		if (videoState === "playing") {
			props.videoRef.current.pause();
			setVideoState("paused");
		}
	}
  return (
    <i id="playPause" className={'fa-solid controls--icon ' + (videoState === "paused" ? 'fa-play' : 'fa-pause')} onClick={playPauseClickHandler}></i>
  )
}

export default PlayPause;