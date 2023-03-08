import "./VideoControls.css";
import React, { forwardRef } from "react";
import Spinner from "../ui/Spinner";
import PrimaryControls from "./controls/PrimaryControls";
import SecondaryControls from "./controls/SecondaryControls";
const VideoControls = (props, ref) => {

	return (
		<div className="controls--container" ref={ref} style={props.isLoading ? {opacity: 1} : {}}>
			<div className="controls controls--top">
				<p>title</p>
			</div>
			{props.isLoading ? <Spinner /> : null}
			<div className="controls">
				<PrimaryControls videoRef={props.videoRef} />
				<SecondaryControls videoRef={props.videoRef} />
			</div>
		</div>
	);
};

export default forwardRef(VideoControls);