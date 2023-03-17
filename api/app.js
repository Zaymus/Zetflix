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

apiRouter.use(cors({origin: "http://localhost:3000"}));
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
				origins: ["http://localhost:3000"]
			}
		});
    io.on('connect', client => {
			console.log('Client connected', client.id);

			client.on('room.join', async (data) => {
				const user = await Users.findById(data.userId);

				client.join(data.roomId);
				client.leave(client.id);
				client.emit('announcement', `${user.username}, welcome to the theatre room!`);
				client.to(data.roomId).emit('announcement', `${user.username} has joined the theatre room!`);
			});

			client.on('room.leave', async (data) => {
				const user = await Users.findById(data.userId);

				client.join(client.id);
				client.leave(data.roomId);
				io.in(data.roomId).emit('announcement', `${user.username}, has left the theatre room.`);
			});

			client.on('room.chat', async (data) => {
				const user = await Users.findById(data.userId);
				client.broadcast.emit('chatMessage', {username: user.username, message: data.message});
				//io.in(data.roomId).emit('chatMessage', {username: user.username, message: data.message});
			});
		});
		console.log(`Listening on port ${env.API_PORT}!`);
	})
	.catch((err) => {
		console.log(err);
	});