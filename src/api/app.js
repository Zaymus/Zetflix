const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { env } = require('./util/constants');

const app = express();
const apiRouter = express.Router();

const userRouter = require('./routes/user');
const videoRouter = require('./routes/video');
const ratingRouter = require('./routes/rating');
const commentRouter = require('./routes/comment');
const theatreRoomRouter = require('./routes/theatreRoom');
const captionRouter = require('./routes/caption');
const authRouter = require('./routes/auth');

const Users = require('./models/user');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', env.APP_URL);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});
apiRouter.use('/users', userRouter);
apiRouter.use('/video', videoRouter);
apiRouter.use('/rating', ratingRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/theatre', theatreRoomRouter);
apiRouter.use('/caption', captionRouter);
apiRouter.use('/auth', authRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRouter);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

mongoose
	.connect(env.MONGODB_URL)
	.then((result) => {
		const server = app.listen(env.API_PORT);
		const io = require('./util/socket').init(server, {
			cors: {
				origins: [env.APP_URL]
			}
		});
    io.on('connection', client => {
			console.log('Client connected', client.id);

			client.on('room.join', async (data) => {
				const user = await Users.findById(data.userId);

				client.join(data.roomId);

				client.emit('announcement', {
					title: "Successfully Joined!",
					type: "success",
					message: `${user.username}, welcome to the theatre room!`
				});

				client.to(data.roomId).emit('announcement', {
					title: "User Joined!",
					message: `${user.username} has joined the theatre room!`
				});
			});

			client.on('room.leave', async (data) => {
				const user = await Users.findById(data.userId);

				client.leave(data.roomId);
				io.to(data.roomId).emit('announcement', {
					title: "User Left",
					message: `${user.username}, has left the theatre room.`
				});
				console.log("client disconnected");
			});

			client.on('room.chat', async (data) => {
				const user = await Users.findById(data.userId);
				io.in(data.roomId).emit('chatMessage', {username: user.username, message: data.message});
			});
	
			client.on('room.play', (data) => {
				io.in(data.roomId).emit('playVideo', data.time);
				io.in(data.roomId).emit('announcement', {
					type: "announcement",
					title: "Video Resumed!",
					message: "Video has started playing.",
				});
			});

			client.on('room.pause', (data) => {
				io.in(data.roomId).emit('pauseVideo', data.time);
				io.in(data.roomId).emit('announcement', {
					type: "announcement",
					title: "Video Paused!",
					message: "Video has been paused.",
				});
			});

			client.on('room.seek', (data) => {
				io.in(data.roomId).emit('seekVideo', data.time);
				io.in(data.roomId).emit('announcement', {
					type: "announcement",
					title: "Video Time Changed!",
					message: `Video time has been changed.`,
				});
			});

			client.on('room.playbackRate', (data) => {
				io.in(data.roomId).emit('videoSpeed', data.speed);
				io.in(data.roomId).emit('announcement', {
					type: "announcement",
					title: "Playback Rate Changed!",
					message: `Video playback rate has been changed to ${data.speed}x`,
				});
			});
		});
		console.log(`Listening on port ${env.API_PORT}!`);
	})
	.catch((err) => {
		console.log(err);
	});