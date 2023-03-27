import React, {useState} from 'react';
import {Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";
import Login from './pages/Login';

const App = () => {

	const [state, setState] = useState({token: null, userId: null});
	const location = useLocation();
	const navigate = useNavigate();

	const loginHandler = (event, authData) => {
		event.preventDefault();
		
		var redirectUrl = location.search.split("=");
		redirectUrl = redirectUrl[1] || "/";
		
		fetch('http://localhost:9000/api/auth/login', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: authData.username,
				password: authData.password,
			}),
		})
		.then((res) => {
			if(res.status === 200) {
				return res.json();
			}
		})
		.then((resData) => {
			setState({
				token: resData.token,
				userId: resData.userId,
			});
			localStorage.setItem('token', resData.token);
			localStorage.setItem('userId', resData.userId);
			localStorage.setItem('username', resData.username);
			navigate(redirectUrl);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return (
		<div>
			<Link to="/login">Login</Link>
			<Link to="/video/63fe4be525aafdeef1686567">Watch Video</Link>
			{ state.token && <Link to="/theatre-room/64077e3cb7676b8118f58739/video/63fd57ad00f5e1f9186f4daf">Theatre Room</Link> }

			<Routes>
				<Route path="/login" element={<Login onLogin={loginHandler.bind(this)} />} />
				<Route path="/video/:videoId" element={<Video />}/>
				{ state.token && <Route path="/theatre-room/:roomId/video/:videoId" element={<TheatreRoom />}/> }
			</Routes>
		</div>
	)
}

export default App;
