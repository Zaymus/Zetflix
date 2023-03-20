import React, { useState, useEffect } from 'react';

const PlayPause = (props) => {
  const [videoState, setVideoState] = useState("paused");

	const playPauseClickHandler = (broadcast = true) => {
  	if (videoState === "paused") {
			props.videoRef.current.play();
			setVideoState("playing");
			broadcast && props.socket?.emit("room.play", {time: props.videoRef.current.currentTime});
		}

		if (videoState === "playing") {
			props.videoRef.current.pause();
			setVideoState("paused");
			broadcast && props.socket?.emit("room.pause", {time: props.videoRef.current.currentTime});
		}
	}

	useEffect(() => {
		props.socket?.on("playVideo", (data) => {
 			props.videoRef.current.currentTime = parseFloat(data.time);
			props.videoRef.current.play();
			setVideoState("playing");
		});

		props.socket?.on("pauseVideo", (data) => {
			props.videoRef.current.currentTime = parseFloat(data.time);
			props.videoRef.current.pause();
			setVideoState("paused");
		});
	}, [props]);

  return (
    <i id="playPause" className={'fa-solid controls--icon ' + (videoState === "paused" ? 'fa-play' : 'fa-pause')} onClick={playPauseClickHandler}></i>
  )
}

export default PlayPause;