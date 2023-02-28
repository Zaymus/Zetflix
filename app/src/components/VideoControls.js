import "./VideoControls.css";
import React, { forwardRef } from "react";

const VideoControls = (props, ref) => {
	return (
		<div className="controls--container" data-state="hidden" ref={ref}>
			<div className="controls controls--top">
				<p>title</p>
			</div>
			<div className="controls">
				<div className="control--group">
					<i className="fa-solid fa-play controls--icon"></i>
					<i className="fa-solid fa-arrow-rotate-left controls--icon"></i>
					<i className="fa-solid fa-arrow-rotate-right controls--icon"></i>
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
