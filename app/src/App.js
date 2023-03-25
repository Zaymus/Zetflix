import React, { Component } from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";
import Login from './pages/Login';

class App extends Component {
	state = {
		token: null,
		userId: null,
	}

	loginHandler(event, authData) {
		event.preventDefault();
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
			this.setState({
				token: resData.token,
				userId: resData.userId,
			});
			localStorage.setItem('token', resData.token);
			localStorage.setItem('userId', resData.userId);
			localStorage.setItem('username', resData.username);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		return(
			<div>
				<Link to="/login">Login</Link>
				<Link to="/video/63fd57ad00f5e1f9186f4daf">Watch Video</Link>
				{ this.state.token && <Link to="/theatre-room/64077e3cb7676b8118f58739/video/63fd57ad00f5e1f9186f4daf">Theatre Room</Link> }

				<Routes>
					<Route path="/login" element={<Login onLogin={this.loginHandler.bind(this)} />} />
					<Route path="/video/:videoId" element={<Video />}/>
					{ this.state.token && <Route path="/theatre-room/:roomId/video/:videoId" element={<TheatreRoom />}/> }
				</Routes>
			</div>
		)
	}
}

export default App;
