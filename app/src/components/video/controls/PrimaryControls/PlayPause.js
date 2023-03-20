import React, { useState, useEffect } from 'react';

const PlayPause = (props) => {
  const [videoState, setVideoState] = useState("paused");

	const playPauseClickHandler = () => {
  	if (videoState === "paused") {
			props.videoRef.current.play();
			setVideoState("playing");
			props.socket?.emit("room.play", {
				time: props.videoRef.current.currentTime,
				roomId: props.room
			});
		}

		if (videoState === "playing") {
			props.videoRef.current.pause();
			setVideoState("paused");
			props.socket?.emit("room.pause", {
				time: props.videoRef.current.currentTime,
				roomId: props.room
			});
		}
	}

	useEffect(() => {
		props.socket?.on("playVideo", (time) => {
 			props.videoRef.current.currentTime = parseFloat(time);
			props.videoRef.current.play();
			setVideoState("playing");
		});

		props.socket?.on("pauseVideo", (time) => {
			props.videoRef.current.currentTime = parseFloat(time);
			props.videoRef.current.pause();
			setVideoState("paused");
		});
	}, [props]);

  return (
    <i id="playPause" className={'fa-solid controls--icon ' + (videoState === "paused" ? 'fa-play' : 'fa-pause')} onClick={playPauseClickHandler}></i>
  )
}

export default PlayPause;