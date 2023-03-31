import React, { useState, useEffect } from 'react';

const PlayPause = (props) => {
  const [videoState, setVideoState] = useState("paused");
	const [isSocketDefined, setIsSocketDefined] = useState("");

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
		if(!isSocketDefined && props.socket) {
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
		}
	}, [props.socket, props.videoRef, isSocketDefined]);

	useEffect(() => {
    if(props.socket) {
      setIsSocketDefined(true);
    }
  }, [props.socket])

  return (
    <i id="playPause" className={'fa-solid controls--icon ' + (videoState === "paused" ? 'fa-play' : 'fa-pause')} onClick={playPauseClickHandler}></i>
  )
}

export default PlayPause;