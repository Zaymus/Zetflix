import React, { useState } from 'react';
import VideoPlayer from "./components/video/VideoPlayer";

const App = () => {
	const [captions, setCaptions] = useState([]);
	fetch('http://localhost:9000/api/caption/63fd57ad00f5e1f9186f4daf', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	.then(response => {
		return response.json();
	})
	.then(jsonData => {
		setCaptions(jsonData);
	})
	.catch(err => {
		console.log(err);
	});

	return (
		<div>
			<VideoPlayer 
				videoSource={'http://localhost:9000/api/video/63fd57ad00f5e1f9186f4daf'}
				captions={captions}
			/>
		</div>
	);
};

export default App;
