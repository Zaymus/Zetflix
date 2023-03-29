import React, {useState} from 'react';
import {Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "./components/ui/NavBar";
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import NotificationList from './components/ui/Notification/NotificationList';

const App = () => {

	const [state, setState] = useState({token: null, userId: null, notification: null});
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
						notification: resData.data,
					};
				});
			} else {
				setState({
					token: resData.data.token,
					userId: resData.data.userId,
					notification: {title: "Login Successful!", type: "success", message: `${resData.data.username}, you have been successfully logged in!`}
				});
				localStorage.setItem('token', resData.data.token);
				localStorage.setItem('userId', resData.data.userId);
				localStorage.setItem('username', resData.data.username);
				navigate(redirectUrl);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const removeNotificationHandler = () => {
		setState((prevState) => {
			return {
				...prevState,
				notification: null,
			}
		});
	}

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		setState({
			token: null,
			userId: null,
			notification: {title: "Logout Successful!", type: "success", message: "You have been Successfully logged out."}
		});
	}

	return (
		<div>
			<NavBar>
				{!state.token && <Link to="/login">Login</Link>}
				{state.token && <Link to="/logout">Logout</Link>}
				<Link to="/video/63fe4be525aafdeef1686567">Watch Video</Link>
				{ state.token && <Link to="/theatre-room/64077e3cb7676b8118f58739/video/63fd57ad00f5e1f9186f4daf">Theatre Room</Link> }
			</NavBar>

			<NotificationList notification={state.notification} removeNotification={removeNotificationHandler}/>

			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={<Login onLogin={loginHandler.bind(this)} />}/>
				<Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
				<Route path="/video/:videoId" element={<Video />}/>
				{ state.token && <Route path="/theatre-room/:roomId/video/:videoId" element={<TheatreRoom />}/> }
			</Routes>
		</div>
	)
}

export default App;
