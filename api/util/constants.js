const dotenv = require("dotenv").config({
	path:__dirname+'/./../../.env'
});

const multer = require('multer');

const env = process.env;

const userValidation = {
	USERNAME_FORMAT: new RegExp(/^(?=.{3,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]+(?<![_-])$/),
	EMAIL_FORMAT: new RegExp(/^([A-Za-z0-9])+@([A-Za-z0-9])+..([A-Za-z]{2,4})$/),
	PASSWORD_FORMAT:
		new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
};

SERVER_STATUS = {
	UP: "up",
};

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + "/../public/images/products");
	},
	filename: (req, file, cb) => {
		console.log(req, file);
		cb(null, file.originalname);
	},
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

const imageUpload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");

const S3_FILE_TYPE = {
	AVATAR: "avatars/",
	CONTENT: "content/",
}

module.exports = {
	env,
  userValidation,
  SERVER_STATUS,
  imageUpload,
	S3_FILE_TYPE,
}