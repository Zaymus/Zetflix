import VideoPlayer from "./components/VideoPlayer";

const App = () => {
	return (
		<div>
			<VideoPlayer videoSource={'http://localhost:9000/api/video/63fd57ad00f5e1f9186f4daf'}/>
		</div>
	);
};

export default App;
