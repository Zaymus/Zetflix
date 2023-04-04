import "./VideoControls.css";
import React, { forwardRef, useState } from "react";
import Spinner from "../../ui/Spinner";
import PrimaryControls from "./PrimaryControls/PrimaryControls";
import SecondaryControls from "./SecondaryControls/SecondaryControls";
import SeekBar from "./PrimaryControls/SeekBar/SeekBar";
import SeekBarTimeData from "./PrimaryControls/SeekBar/SeekBarTimeData";

const VideoControls = (props, ref) => {

	const bottomControlRef = React.useRef();

	const [isVideoComplete, setIsVideoComplete] = useState(false);

	if (props.timeData.watched === 100 && !isVideoComplete) {
		setIsVideoComplete(true);
	} else if (props.timeData.watched < 100 && isVideoComplete) {
		setIsVideoComplete(false);
	}
	
	return (
		<div className="controls--container" ref={ref} style={props.isLoading ? {opacity: 1} : {}}>
			<div className="controls controls--top">
				<p>{props.videoData.title || ""}</p>
			</div>
			{props.isLoading ? <Spinner /> : null}
			<div className="controls">
				<div className="bottom-controls" ref={bottomControlRef}>
					<SeekBarTimeData timeData={props.timeData}/>
					<SeekBar videoRef={props.videoRef} timeData={props.timeData} onSeek={props.onSeek}/>
					<div className="bottom-controls--wrapper">
						<PrimaryControls videoRef={props.videoRef} room={props.room} socket={props.socket} isComplete={isVideoComplete}/>
						<SecondaryControls 
							videoRef={props.videoRef} 
							bottomControlRef={bottomControlRef} 
							fullscreenControls={props.fullscreenControls}
							room={props.room}
							socket={props.socket}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default forwardRef(VideoControls);