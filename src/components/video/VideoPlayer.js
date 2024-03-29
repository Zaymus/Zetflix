import "./VideoPlayer.css";
import VideoControls from "./controls/VideoControls";
import React, { useState } from "react";

const VideoPlayer = (props) => {
	const videoRef = React.useRef();
	const controlsRef = React.useRef();
	const [loading, setLoading] = useState('');
	const [times, setTimes] = useState({watched: 0, buffered: 0, watchTime: 0, totalTime: 0});
	const [fullscreen, setFullScreen] = useState(false);
	const [videoData, setVideoData] = useState({title: ""});

	const handleResize = () => {
		controlsRef.current.style.height = `calc(${videoRef.current.offsetHeight}px + 2rem)`;
		controlsRef.current.style.width = `calc(${videoRef.current.offsetWidth}px + 2rem)`;
	};

	const timeUpdateHandler = (event) => {
		const buff = event.target.buffered;
		const watchPercent = (event.target.currentTime / event.target.duration) * 100;
		const idx = buff.length >= 2 ? buff.length - 2 : 0;
		const buffered = (buff.end(idx) / event.target.duration) * 100;
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
		props.socket?.emit("room.seek", {
			time: video.currentTime,
			roomId: props.room
		});
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

	const getVideoData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/api/video/data/${props.videoId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(response => {
			return response.json();
		})
		.then(jsonData => {
			setVideoData(jsonData);
		})
		.catch(err => {
			console.log(err);
		});
	}

	React.useEffect(() => {
		handleResize();
		window.addEventListener("load", handleResize, false);
		window.addEventListener("resize", handleResize, false);
		getVideoData();
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
				<source src={`${process.env.REACT_APP_API_URL}/api/video/${props.videoId}`} type="video/mp4" />
				{props.captions?.data?.length && props.captions?.data?.map((caption) => {
					return <track kind="subtitles" label={caption.label} data-key={caption.captionKey} key={caption._id}/>
				})}
			</video>
			<VideoControls 
				ref={controlsRef} 
				videoRef={videoRef} 
				isLoading={loading}
				timeData={times}
				onSeek={seekHandler}
				fullscreenControls={{fullscreen: fullscreen, setFullScreen: setFullScreen}}
				videoData={videoData}
				room={props.room}
				socket={props.socket} 
			/>
		</div>
	);
};

export default VideoPlayer;
