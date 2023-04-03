import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from "./components/ui/NavBar";
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import CreateTheatreRoom from './pages/CreateTheatreRoom';
import NotificationList from './components/ui/Notification/NotificationList';

const App = () => {

	const [state, setState] = useState({
		token: null,
		userId: null,
		notification: null,
		socket: null,
	});

	const location = useLocation();
	const navigate = useNavigate();

	const loginHandler = (event, authData) => {
		event.preventDefault();
		
		var redirectUrl = location.search.split("=");
		redirectUrl = redirectUrl[1] || "/";
		
		fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
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
				notificationHandler(resData.data);
			} else {
				localStorage.setItem('token', resData.data.token);
				localStorage.setItem('userId', resData.data.userId);
				localStorage.setItem('username', resData.data.username);
				setState((prevState) => {
					return {
						...prevState,
						token: resData.data.token,
						userId: resData.data.userId,
						username: resData.data.username,
					}
				});
				notificationHandler({title: "Login Successful!", type: "success", message: `${resData.data.username}, you have been successfully logged in!`});
				navigate(redirectUrl);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const removeNotificationHandler = () => {
		notificationHandler(null);
	}

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		setState((prevState) => {
			return {
				...prevState,
				token: null,
				userId: null,
				username: null,
			}
		});
		notificationHandler({title: "Logout Successful!", type: "success", message: "You have been Successfully logged out."});
	}

	const notificationHandler = (notification) => {
		setState((prevState) => {
			return {
				...prevState,
				notification: notification,
			}
		});
	}

	const setSocketHandler = (socket) => {
		setState((prevState) => {
			return {
				...prevState,
				socket: socket,
			}
		});
	}

	useEffect(() => {
		setState((prevState => {
			return {
				...prevState,
				token: localStorage.getItem("token"),
				userId: localStorage.getItem("userId"),
				username: localStorage.getItem("username"),
			}
		}));
	}, []);

	return (
		<div>
			<NavBar>
				{!state.token && <Link to="/login">Login</Link>}
				{state.token && <Link to="/logout">Logout</Link>}
			</NavBar>

			<NotificationList notification={state.notification} removeNotification={removeNotificationHandler} socket={state.socket} />

			<Routes>
				<Route path="/" element={<Dashboard state={state}/>} />
				<Route path="/login" element={<Login onLogin={loginHandler.bind(this)} />}/>
				<Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
				<Route path="/video/:videoId" element={<Video />}/>
				{ state.token && <Route path='/theatre-room' element={<CreateTheatreRoom state={state} onNotification={notificationHandler} />}></Route>}
				{ state.token && <Route path="/theatre-room/:roomId/video/:videoId" element={<TheatreRoom onNotification={notificationHandler} setSocket={setSocketHandler} socket={state.socket}/>}/> }
			</Routes>
		</div>
	)
}

export default App;
