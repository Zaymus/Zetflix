const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3, S3_FILE_TYPE, env, generateRandomString } = require('../util/constants');

const thumbnailFileStorage = multerS3({
	s3: s3,
	bucket: env.S3_BUCKET_NAME,
	key: function (req, file, cb) {
		const fileName = S3_FILE_TYPE.THUMBNAIL + Date.now().toString() + "-" + generateRandomString();
		const fileExt = "." + file.originalname.split('.').pop();
		req.thumbnailKey = fileName + fileExt;
		cb(null, fileName + fileExt);
	}
});

const thumbnailFileFilter = (req, file, cb) => {
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

const thumbnailUpload = multer({ storage: thumbnailFileStorage, fileFilter: thumbnailFileFilter }).single("thumbnail");

module.exports = thumbnailUpload;