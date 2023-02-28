const dotenv = require("dotenv").config({
	path:__dirname+'/./../../.env'
});
const env = process.env;

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const userValidation = {
	USERNAME_FORMAT: new RegExp(/^(?=.{3,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]+(?<![_-])$/),
	EMAIL_FORMAT: new RegExp(/^([A-Za-z0-9])+@([A-Za-z0-9])+..([A-Za-z]{2,4})$/),
	PASSWORD_FORMAT:
		new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
};

SERVER_STATUS = {
	UP: "up",
};

const S3_FILE_TYPE = {
	AVATAR: "avatars/",
	CONTENT: "content/",
}

const s3 = new AWS.S3({
  apiVersion: 'latest',
  accessKeyId: env.S3_ID,
  secretAccessKey: env.S3_SECRET,
});

const generateRandomString = (length=15)=>Math.random().toString(20).substring(2, length);

const commentRatingTypes = {
	LIKE: "like",
	DISLIKE: "dislike",
}

module.exports = {
	env,
  userValidation,
  SERVER_STATUS,
	S3_FILE_TYPE,
	s3,
	generateRandomString,
	commentRatingTypes,
}