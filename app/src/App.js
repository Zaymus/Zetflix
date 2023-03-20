import React, { Component } from 'react';
import Video from "./pages/Video";
import TheatreRoom from "./pages/TheatreRoom";

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
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		// return (<Video videoId="63fd57ad00f5e1f9186f4daf"/>);
		return (<TheatreRoom videoId="63fd57ad00f5e1f9186f4daf" roomId="64077e3cb7676b8118f58739"/>);
		// return (<div></div>)
	}
}

export default App;
