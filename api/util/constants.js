const dotenv = require("dotenv").config({
	path:__dirname+'/./../../.env'
});
const env = process.env;

const multer = require('multer');
const multerS3 = require('multer-s3');

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

// const fileStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, __dirname + "/../public");
// 	},
// 	filename: (req, file, cb) => {
// 		console.log(req, file);
// 		cb(null, file.originalname);
// 	},
// });

const fileStorage = multerS3({
	s3: s3,
	bucket: env.S3_BUCKET_NAME,
	key: function (req, file, cb) {
		const fileName = "avatars/" + Date.now().toString() + "-" + generateRandomString();
		const fileExt = "." + file.originalname.split('.').pop();
		req.newAvatarKey = fileName + fileExt;
		cb(null, fileName + fileExt);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const imageUpload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("avatar");
module.exports = {
	env,
  userValidation,
  SERVER_STATUS,
  imageUpload,
	S3_FILE_TYPE,
	s3,
}