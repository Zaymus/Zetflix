const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { env } = require('./util/constants');

const app = express();
const apiRouter = express.Router();

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(middleware);
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
		app.listen(env.API_PORT);
		console.log(`Listening on port ${env.API_PORT}!`);
	})
	.catch((err) => {
		console.log(err);
	});