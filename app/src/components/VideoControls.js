import "./VideoControls.css";
import React, { forwardRef, useState } from "react";

const VideoControls = (props, ref) => {
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

	const forwardClickHandler = () => {
		props.videoRef.current.currentTime += 10;
	}

	const rewindClickHandler = () => {
		props.videoRef.current.currentTime -= 10;
	}

	return (
		<div className="controls--container" data-state="hidden" ref={ref}>
			<div className="controls controls--top">
				<p>title</p>
			</div>
			<div className="controls">
				<div className="control--group">
					<i id="playPause" className={'fa-solid controls--icon ' + (videoState === "paused" ? 'fa-play' : 'fa-pause')} onClick={playPauseClickHandler}></i>
					<i className="fa-solid fa-arrow-rotate-left controls--icon" onClick={rewindClickHandler}></i>
					<i className="fa-solid fa-arrow-rotate-right controls--icon" onClick={forwardClickHandler}></i>
					<i className="fa-solid fa-volume-high controls--icon"></i>
				</div>
				<div className="control--group">
					<i className="fa-solid fa-closed-captioning controls--icon"></i>
					<i className="fa-solid fa-gauge-high controls--icon"></i>
					<i className="fa-solid fa-expand controls--icon"></i>
				</div>
			</div>
		</div>
	);
};

export default forwardRef(VideoControls);
