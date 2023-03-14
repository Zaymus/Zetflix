import "./VideoPlayer.css";
import VideoControls from "./VideoControls";
import React, { useState } from "react";

const VideoPlayer = (props) => {
	const videoRef = React.useRef();
	const controlsRef = React.useRef();
	const [loading, setLoading] = useState('');
	const [times, setTimes] = useState({watched: 0, buffered: 0, watchTime: 0, totalTime: 0});
	const [fullscreen, setFullScreen] = useState(false);

	const handleResize = () => {
		controlsRef.current.style.height = `calc(${videoRef.current.offsetHeight}px + 2rem)`;
		controlsRef.current.style.width = `calc(${videoRef.current.offsetWidth}px + 2rem)`;
	};

	const timeUpdateHandler = (event) => {
		const buff = event.target.buffered;
		const watchPercent = (event.target.currentTime / event.target.duration) * 100;
		const buffered = (buff.end(buff.length - 2 || 0) / event.target.duration) * 100;
		setTimes((prevState) => {
			return {
				...prevState,
				watched: watchPercent,
				buffered: buffered,
				watchTime: event.target.currentTime,
			}
		});
	}

	const seekHandler = (percentage) => {
		const video = document.querySelector("#video-player");
		const newTime = percentage * video.duration;
		video.currentTime = newTime;
		setTimes((prevState) => {
			return {
				...prevState,
				watched: newTime,
			};
		});
	}

	const canPlayHandler = (event) => {
		setLoading(false);
		setTimes({...times, totalTime: event.target.duration});
	}

	React.useEffect(() => {
		window.addEventListener("load", handleResize, false);
		window.addEventListener("resize", handleResize, false);
	}, []);

	return (
		<div className="video--container">
			<video 
				id="video-player" 
				ref={videoRef} 
				onWaiting={() => {setLoading(true);}} 
				onCanPlay={canPlayHandler}
				onTimeUpdate={timeUpdateHandler}
			>
				<source src={props.videoSource} type="video/mp4" />
			</video>
			<VideoControls 
				ref={controlsRef} 
				videoRef={videoRef} 
				isLoading={loading}
				timeData={times}
				onSeek={seekHandler}
				fullscreenControls={{fullscreen: fullscreen, setFullScreen: setFullScreen}}
			/>
		</div>
	);
};

export default VideoPlayer;
