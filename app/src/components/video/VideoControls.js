import "./VideoControls.css";
import React, { forwardRef } from "react";
import Spinner from "../ui/Spinner";
import PrimaryControls from "./controls/PrimaryControls";
import SecondaryControls from "./controls/SecondaryControls";
import SeekBar from "./controls/SeekBar";

const VideoControls = (props, ref) => {

	return (
		<div className="controls--container" ref={ref} style={props.isLoading ? {opacity: 1} : {}}>
			<div className="controls controls--top">
				<p>title</p>
			</div>
			{props.isLoading ? <Spinner /> : null}
			<div className="controls">
				<div className="bottom-controls">
					<SeekBar videoRef={props.videoRef} timeData={props.timeData} onSeek={props.onSeek}/>
					<div className="bottom-controls--wrapper">
						<PrimaryControls videoRef={props.videoRef} />
						<SecondaryControls videoRef={props.videoRef} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default forwardRef(VideoControls);