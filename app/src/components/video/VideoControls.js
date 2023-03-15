import "./VideoControls.css";
import React, { forwardRef } from "react";
import Spinner from "../ui/Spinner";
import PrimaryControls from "./controls/PrimaryControls/PrimaryControls";
import SecondaryControls from "./controls/SecondaryControls/SecondaryControls";
import SeekBar from "./controls/PrimaryControls/SeekBar/SeekBar";
import SeekBarTimeData from "./controls/PrimaryControls/SeekBar/SeekBarTimeData";

const VideoControls = (props, ref) => {

	const bottomControlRef = React.useRef();

	return (
		<div className="controls--container" ref={ref} style={props.isLoading ? {opacity: 1} : {}}>
			<div className="controls controls--top">
				<p>title</p>
			</div>
			{props.isLoading ? <Spinner /> : null}
			<div className="controls">
				<div className="bottom-controls" ref={bottomControlRef}>
					<SeekBarTimeData timeData={props.timeData}/>
					<SeekBar videoRef={props.videoRef} timeData={props.timeData} onSeek={props.onSeek}/>
					<div className="bottom-controls--wrapper">
						<PrimaryControls videoRef={props.videoRef} />
						<SecondaryControls 
							videoRef={props.videoRef} 
							bottomControlRef={bottomControlRef} 
							fullscreenControls={props.fullscreenControls}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default forwardRef(VideoControls);