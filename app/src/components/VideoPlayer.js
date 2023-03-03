import "./VideoPlayer.css";
import VideoControls from "./VideoControls";
import React from "react";
// import video from "../videos/Kassadin_Gaming.mp4";

const VideoPlayer = (props) => {
	const videoRef = React.useRef();
	const controlsRef = React.useRef();

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
			<video id="video-player" ref={videoRef} autoPlay>
				<source src={props.videoSource} type="video/mp4" />
			</video>
			<VideoControls ref={controlsRef} />
		</div>
	);
};

export default VideoPlayer;
