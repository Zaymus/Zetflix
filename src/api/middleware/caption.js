const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3, S3_FILE_TYPE, env, generateRandomString } = require('../util/constants');

const captionFileStorage = multerS3({
	s3: s3,
	bucket: env.S3_BUCKET_NAME,
	key: function (req, file, cb) {
		const fileName = S3_FILE_TYPE.CAPTION + Date.now().toString() + "-" + generateRandomString();
		req.captionKey = fileName;
		cb(null, fileName);
	}
});

const captionFileFilter = (req, file, cb) => {
	if (file.mimetype === "text/vtt") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const captionUpload = multer({ storage: captionFileStorage, fileFilter: captionFileFilter }).single("caption");

module.exports = captionUpload;