import React, {useState} from 'react';
import {Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "./components/ui/NavBar";
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {

	const [state, setState] = useState({token: null, userId: null, error: null});
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
		.then(async (res) => {
			return { data: await res.json(), status: res.status };
		})
		.then((resData) => {
			if (resData.status !== 200) {
				resData.data.title = 'Error Logging In';
				resData.data.type = 'error';
				setState((prevState) => {
					return {
						...prevState,
						error: resData.data,
					};
				});
			} else {
				setState({
					token: resData.token,
					userId: resData.userId,
				});
				localStorage.setItem('token', resData.token);
				localStorage.setItem('userId', resData.userId);
				localStorage.setItem('username', resData.username);
				navigate(redirectUrl);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const removeErrorHandler = () => {
		console.log("remove notification state");
		setState((prevState) => {
			return {
				...prevState,
				error: null,
			}
		});
	}

	return (
		<div>
			<NavBar>
				<Link to="/login">Login</Link>
				<Link to="/video/63fe4be525aafdeef1686567">Watch Video</Link>
				{ state.token && <Link to="/theatre-room/64077e3cb7676b8118f58739/video/63fd57ad00f5e1f9186f4daf">Theatre Room</Link> }
			</NavBar>
			
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={
					<Login 
						onLogin={loginHandler.bind(this)} 
						error={state.error}
						removeNotification={removeErrorHandler}
					/>
				}/>
				<Route path="/video/:videoId" element={<Video />}/>
				{ state.token && <Route path="/theatre-room/:roomId/video/:videoId" element={<TheatreRoom />}/> }
			</Routes>
		</div>
	)
}

export default App;
