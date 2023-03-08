import "./VideoPlayer.css";
import VideoControls from "./VideoControls";
import React, { useState } from "react";

const VideoPlayer = (props) => {
	const videoRef = React.useRef();
	const controlsRef = React.useRef();
	const [loading, setLoading] = useState('');

	const handleResize = () => {
		controlsRef.current.style.height = videoRef.current.offsetHeight + "px";
		controlsRef.current.style.width = videoRef.current.offsetWidth + "px";
	};

	React.useEffect(() => {
		window.addEventListener("load", handleResize, false);
		window.addEventListener("resize", handleResize, false);
	}, []);

	return (
		<div className="video--container">
			<video id="video-player" ref={videoRef} onWaiting={() => {setLoading(true);}} onCanPlay={() => {setLoading(false);}}>
				<source src={props.videoSource} type="video/mp4" />
			</video>
			<VideoControls ref={controlsRef} videoRef={videoRef} isLoading={loading}/>
		</div>
	);
};

export default VideoPlayer;
