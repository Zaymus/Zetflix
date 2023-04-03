const jwt = require('jsonwebtoken');
const { env } = require("../util/constants");

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, env.JWT_SECRET);
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}
	const user = {
		userId: decodedToken.userId,
		username: decodedToken.username,
		email: decodedToken.email,
		avatarKey: decodedToken.avatarKey,
	}
	req.user = user;
	next();
};
