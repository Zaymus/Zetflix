const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3, env, generateRandomString } = require('../util/constants');

const avatarFileStorage = multerS3({
	s3: s3,
	bucket: env.S3_BUCKET_NAME,
	key: function (req, file, cb) {
		const fileName = S3_FILE_TYPE.AVATAR + Date.now().toString() + "-" + generateRandomString();
		const fileExt = "." + file.originalname.split('.').pop();
		req.newAvatarKey = fileName + fileExt;
		cb(null, fileName + fileExt);
	}
});

const avatarFileFilter = (req, file, cb) => {
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

const imageUpload = multer({ storage: avatarFileStorage, fileFilter: avatarFileFilter }).single("avatar");

module.exports = imageUpload;