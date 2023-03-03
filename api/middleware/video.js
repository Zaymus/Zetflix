const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3, S3_FILE_TYPE, env, generateRandomString } = require('../util/constants');

const videoFileStorage = multerS3({
	s3: s3,
	bucket: env.S3_BUCKET_NAME,
	key: function (req, file, cb) {
		const fileName = S3_FILE_TYPE.CONTENT + Date.now().toString() + "-" + generateRandomString();
		const fileExt = "." + file.originalname.split('.').pop();
		req.videoKey = fileName + fileExt;
		cb(null, fileName + fileExt);
	}
});

const videoFileFilter = (req, file, cb) => {
	if ( file.mimetype === "video/mp4") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const videoUpload = multer({ storage: videoFileStorage, fileFilter: videoFileFilter }).single("video");

module.exports = videoUpload;